const feathers = require("@feathersjs/feathers");
const express = require("@feathersjs/express");
const socketio = require("@feathersjs/socketio");
const configuration = require("@feathersjs/configuration");
const cors = require("cors");
const debug = require("debug")("gu-api");
const config = require("../config");
const db = require("./db");

db.on("query", function(queryData) {
  console.log(queryData.sql); //debugging
});

let setDb = context => {
  context.params.db = db;
  return context;
};

const load = async app => {
  debug("started!");
  debug("configuring networking...");
  let path = `/api/${config["api-version"]}`;
  const api = express(feathers());
  api.configure(configuration());
  api.use(express.json());
  api.use(express.urlencoded({ extended: true }));
  api.configure(express.rest());
  api.configure(socketio());
  api.use(
    cors({
      credentials: true
    })
  );

  api.hooks({
    before: {
      all: [setDb],
      find: [
        context => {
          if (context.params.query && context.params.query.opt) {
            let opt = context.params.query.opt;
            context.params.opt = opt;
            delete context.params.query.opt;
          } else context.params.opt = {};
          return context;
        }
      ]
    }
  });

  api.hooks(require("./global-hooks"));

  await require("./models")(api, db);
  await require("./services")(api, db);
  await require("./utils/auth")(api, db);

  require("./channels").configure(api);

  if (process.env.FEATHERS_ERROR_HANDLER != "OFF") {
    api.use(express.errorHandler());
  }

  app.use(path, api); //Add api to app
  debug("finnished!");
  return server => {
    api.setup(server);
  };
};
module.exports = load;
