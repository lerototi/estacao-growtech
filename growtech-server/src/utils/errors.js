const { BadRequest } = require("@feathersjs/errors");

class InvalidParameterError extends BadRequest {
  constructor(msg, field) {
    super("Invalid Parameters", {
      errors: [
        {
          message: msg,
          path: [field]
        }
      ]
    });
  }
}
exports.InvalidParameterError = InvalidParameterError;
