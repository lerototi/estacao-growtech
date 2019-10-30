const debug = require("debug")("gu-model-table-creator");

const createTable = async (model, models, db, postSetup) => {
  if (await db.schema.hasTable(model.table)) {
    return;
  }

  await db.schema.createTable(model.table, function(table) {
    debug("creating table %o", model.name);
    table.increments(model.id);
    for (let field of model.fields || []) {
      switch ((field.type || "").toLowerCase()) {
        case "date":
          table.date(field.name);
          break;
        case "time":
          table.string(field.name, 5);
          break;
        case "integer":
        case "small-integer":
        case "number":
        case "money":
        case "percentage":
          table.float(field.name, field.precision || 8, field.scale || 2);
          break;
        case "boolean":
          table.boolean(field.name);
          break;
        case "timestamp":
          table.timestamp(field.name);
          break;
        default:
          table.string(field.name, field.size || undefined);
      }
    }
  });

  postSetup.then(async () => {
    await db.schema.alterTable(model.table, function(table) {
      for (let relation of model.relations || []) {
        let target = models.find(x => x.name == relation.target);
        table.integer(target.id);
        let constraint = table
          .foreign(target.id)
          .references(target.id)
          .inTable(target.table);
        if (relation.onDelete) constraint.onDelete(relation.onDelete);
        if (relation.onUpdate) constraint.onUpdate(relation.onUpdate);
      }
    });
  });
};
module.exports = createTable;
