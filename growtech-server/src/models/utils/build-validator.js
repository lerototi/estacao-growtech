const Joi = require("@correa/joi-pt-br");

const buildValidator = (model, models) => {
  let keys = {};
  for (let field of model.fields || []) {
    let rule = null;
    let appliedDefaultValue = false;
    switch ((field.type || "").toLowerCase()) {
      case "date":
      case "datetime":
        rule = Joi.date();
        break;
      case "integer":
      case "small-integer":
      case "duration":
        rule = Joi.number().integer();
        break;
      case "number":
      case "money":
      case "percentage":
        rule = Joi.number().precision(field.precision || 2);
        break;
      case "boolean":
        rule = Joi.boolean();
        break;
      case "timestamp":
        rule = Joi.date().timestamp();
        break;
      case "email":
        rule = Joi.string().email();
        break;
      case "ip":
        rule = Joi.string().ip();
        break;
      case "hex":
        rule = Joi.string().hex();
        break;
      case "cpf":
      case "cnpj":
      case "cpf-cnpj":
        rule = Joi.string().replace(/\D/g, "");
        if (field.type == "cpf") {
          rule = rule.regex(/^\d{11}$/, { name: "cpf" });
        } else if (field.type == "cnpj") {
          rule = rule.regex(/^\d{14}$/, { name: "cnpj" });
        } else if (field.type == "cpf-cnpj") {
          rule = rule.regex(/^(\d{11}|\d{14})$/, { name: "cpf-cnpj" });
        }
        break;
      case "telefone":
      case "celular":
        rule = Joi.string().replace(/\D/g, "");
        if (field.type == "telefone") {
          rule = rule.regex(/^\d{10}$/, { name: "telefone" });
        } else if (field.type == "cpf-cnpj") {
          rule = rule.regex(/^(\d{11}|\d{14})$/, { name: "celular" });
        }
        break;
      default:
        rule = Joi.string();
        appliedDefaultValue = true;
        if (field.default) {
          rule = rule.default(
            field.default,
            field.description || "generic-string"
          );
        }
        if (field.regex) {
          rule = rule.regex(field.regex.pattern, field.regex.name);
        }
        if (field.remove) rule = rule.replace(field.remove, "");
        if (field.lowercase) rule = rule.lowercase();
        if (field.uppercase) rule = rule.uppercase();
    }
    if (!appliedDefaultValue && field.default) {
      rule = rule.default(field.default, field.description || field.type);
    }
    if (field.min) rule = rule.min(field.min);
    if (field.max || field.size) rule = rule.max(field.max || field.size);
    if (field.required && !field.default) rule = rule.required();
    else rule = rule.allow("").allow(null);

    rule = rule.label(field.label || field.name);

    keys[field.name] = rule;
  }

  for (let relation of model.relations || []) {
    let targetModel = models.find(x => x.name == relation.target);
    if (!targetModel) continue;
    let rule = Joi.number();
    if (relation.required) rule = rule.required();
    else rule = rule.allow(null);
    rule = rule.label(relation.label || relation.target);
    keys[relation.name || targetModel.id] = rule;
  }
  keys[model.id] = Joi.number();

  return Joi.object()
    .keys(keys)
    .unknown(true);
};

module.exports = buildValidator;
