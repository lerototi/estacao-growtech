const fs = require("fs");
const path = require("path");
const Case = require("case");
const debug = require("debug")("gu-service-loader");

let services = fs.readdirSync(__dirname);
services = services.filter(
  file => file != "index.js" && file.indexOf(".js") != -1
);

services = services.map(file => ({
  ...require(path.join(__dirname, file)),
  name: Case.kebab(file.replace(".js", ""))
}));

const load = async (api, db) => {
  debug("started!");
  api.use("/services", {
    async find() {
      return services.map(x => x.name);
    }
  });

  for (let service of services) {
    debug("creating service %o", service.name);

    api.use(service.name, service.methods);

    if (service.hooks) {
      debug("applying hooks to %o", service.name);
      api.service(service.name).hooks(service.hooks);
    }
  }
  debug("finished!");
};

module.exports = load;