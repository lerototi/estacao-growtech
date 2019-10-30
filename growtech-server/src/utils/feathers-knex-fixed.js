const { Service } = require("feathers-knex");
const errorHandler = require("feathers-knex/lib/error-handler");

class ServiceFixed extends Service {
  _create(data, params = {}) {
    if (Array.isArray(data)) {
      return Promise.all(data.map(current => this._create(current, params)));
    }

    const client = this.db(params).client.config.client;
    const returning = client === "pg" || client === "oracledb" ? [this.id] : [];

    return this.db(params)
      .insert(data, returning)
      .then(rows => {
        const id = data[this.id] !== undefined ? data[this.id] : rows[0];

        return this._get(id, params);
      })
      .catch(errorHandler);
  }
}

module.exports = params => new ServiceFixed(params);
