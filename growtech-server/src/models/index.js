const fs = require("fs");
const path = require("path");
const Case = require("case");
const debug = require("debug")("gu-model-loader");
const { BadRequest } = require("@feathersjs/errors");
const knex = require("knex");

const dbservice = require("../utils/feathers-knex-fixed");
const config = require("../../config.json");

const createTable = require("./utils/create-table");
const buildValidator = require("./utils/build-validator");

let models = fs.readdirSync(__dirname);
models = models.filter(file => file != "index.js" && file.indexOf(".js") != -1);
models = models.map(file => ({
  ...require(path.join(__dirname, file)),
  name: Case.kebab(file.replace(".js", ""))
}));

models = models.map(model => ({
  ...model,
  service: model.plural || model.name,
  table: Case.snake(config["table-prefix"] + (model.plural || model.name)),
  id: "id"
}));

models = models.map(model => ({
  ...model,
  validator: buildValidator(model, models)
}));

const validateAndSanitize = model => async context => {
  let a = {};
  let dataset = context.data.length ? context.data : [context.data];
  for (let instance of dataset) {
    for (let field of model.fields) {
      if (
        field.query ||
        (context.method == "create" && instance[field.name] == null) ||
        (field.readonly && context.params.provider && context.method != "find")
      ) {
        delete instance[field.name];
      }
    }
  }
  try {
    for (let index in dataset) {
      dataset[index] = await model.validator.validate(dataset[index]);
    }
  } catch (e) {
    throw new BadRequest("Invalid Parameters", {
      errors: e.details
    });
  }

  context.data = context.data.length ? dataset : dataset[0];
  return context;
};

const populateQueryFields = (knex, model) => async context => {
  let results = [context.result];
  if (context.method == "find") results = context.result.data;
  for (let result of results) {
    for (let field of model.fields || []) {
      if (!field.query) continue;
      let sql = field.query.sql || field.query;
      let params = field.query.params ? [...field.query.params] : [];
      for (let i in params) {
        if (result[params[i]] == undefined) continue;
        params[i] = result[params[i]]; // replace field name by current field value
      }
      let res = await knex.raw(sql, params);
      result[field.name] = ((res || [])[0] || {})[field.name];
    }
  }
  if (context.method == "find") {
    context.result.data = results;
  } else context.result = results[0];
  return context;
};

const protectSecretFields = model => async context => {
  if (!context.params.provider) return; // Is intern call
  let results = [context.result];
  if (context.method == "find") results = context.result.data;
  for (let result of results) {
    for (let field of model.fields || []) {
      if (!field.secret) continue;
      delete result[field.name];
    }
  }
  if (context.method == "find") {
    context.result.data = results;
  } else context.result = results[0];
  return context;
};

const searchFilter = model => context => {
  let search = null;
  if (context.params.query && context.params.query.$search) {
    search = context.params.query.$search;
    delete context.params.query.$search;
  }
  const query = context.service.createQuery(context.params);

  if (search) {
    let keyword = search.keyword.toUpperCase();
    if (keyword.indexOf("%") == -1) keyword = `%${keyword}%`;
    let fields = search.fields.filter(x => {
      let field = model.fields.find(y => y.name == x);
      return field.searchable && !field.query;
    });
    if (fields.length > 0) {
      query.where(function() {
        this.where(knex.raw("UPPER(??) like ?", [fields[0], keyword]));
        for (let field of fields.slice(1)) {
          this.orWhere(knex.raw("UPPER(??) like ?", [field, keyword]));
        }
      });
    }
  }

  context.params.knex = query;
  return context;
};

const load = async (api, db) => {
  debug("started!");
  let done;
  const postInstall = new Promise(resolve => {
    done = resolve;
  });
  api.models = models;

  api.use("/models", {
    async find() {
      return models.map(model => ({
        id: model.id,
        name: model.name,
        representation: model.representation || "",
        service: model.service,
        fields: (model.fields ? model.fields.filter(x => !x.secret) : []).map(
          x => ({
            ...x,
            query: undefined,
            readonly: (x.query ? true : undefined) || x.readonly,
            sortable: x.query ? false : x.sortable
          })
        ),
        relations: model.relations ? model.relations.filter(x => !x.secret) : []
      }));
    }
  });

  for (let model of models) {
    if (config["create-missing-tables"] || model.createTable) {
      await createTable(model, models, db, postInstall);
    }
    debug("creating model service %o", model.service);

    api.use(
      model.service,
      dbservice({
        Model: db,
        id: model.id,
        name: model.table,
        multi: true,
        paginate: {
          default: 10,
          max: 30
        }
      })
    );

    api.service(model.service).hooks({
      before: {
        create: [validateAndSanitize(model)],
        patch: [validateAndSanitize(model)],
        update: [validateAndSanitize(model)],
        find: [searchFilter(model)]
      },
      after: {
        all: [
          populateQueryFields(db, model, models),
          protectSecretFields(model)
        ]
      }
    });

    if (model.hooks) {
      debug("applying hooks to %o", model.service);
      api.service(model.service).hooks(model.hooks);
    }
  }
  debug("finished!");
  done();
};

module.exports = load;
