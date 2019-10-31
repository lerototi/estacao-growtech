const { hashPassword } = require("@feathersjs/authentication-local").hooks;
const { authenticate } = require("@feathersjs/authentication");
const { Forbidden } = require("@feathersjs/errors");
const checkPermissions = require("feathers-permissions");
const hashLocalPassword = hashPassword("password", { strategy: "local" });
const decode = require("jwt-decode");
const moment = require("moment");

module.exports = {
  plural: "users",
  representation: "#id, #email, #cellphone, #created_at, #active",
  fields: [
    {
      name: "cellphone_number",
      label: "Número do celular do usuário",
      size: 17,
      cols: 8
    },
    {
      name: "cellphone_confirmation_date",
      label: "Confirmação numero celular",
      type: "timestamp"
    },
    {
      name: "email",
      type: "email",
      label: "E-mail",
      required: true,
      cols: 6
    },
    {
      name: "password",
      label: "Senha",
      type: "password",
      secret: true,
      required: true,
      size: 60,
      min: 4,
      cols: 6
    },
    {
      name: "created_at",
      label: "Data do Registro",
      type: "timestamp"
    },
    {
      name: "updated_at",
      label: "Data Atualização",
      type: "timestamp"
    },
    { name: "last_access", label: "Ultimo acesso", type: "timestamp" },
    {
      name: "active",
      label: "Usuario ativo no sistema",
      type: "boolean"
    },
    {
      name: "blockade_date",
      label: "Data de Bloqueio",
      type: "timestamp"
    }
  ],
  relations: [{ target: "id_person" }],
  hooks: {
    before: {
      all: [
        async context => {
          // Corrige problemas de montar query p auntenthication usando knex
          delete context.params.knex;
        }
      ],
      create: [
        async context => {
          console.log(context);

          context.params.permissions = "user";

          context.params.arca = {
            first_name: context.data.first_name,
            last_name: context.data.last_name,
            //accepted_term: context.data.accepted_term,
            //id_term: context.data.id_term,
            password: context.data.password
          };

          delete context.data.first_name;
          delete context.data.last_name;
          //delete context.data.accepted_term;

          return context;
        },
        hashLocalPassword
      ],
      patch: [
        authenticate("jwt"),
        checkPermissions({
          roles: ["user"]
        }),
        hashLocalPassword
      ],
      update: [
        authenticate("jwt"),
        checkPermissions({
          roles: ["user"]
        }),
        hashLocalPassword
      ],
      remove: [
        authenticate("jwt"),
        checkPermissions({
          roles: ["admin"]
        })
      ],
      find: [authenticate("jwt")],
      get: [authenticate("jwt")]
    },
    after: {
      create: [
        //criar cadastro pessoa física e add id_person

        async context => {
          person = await context.app.service("person").create({
            first_name: context.params.arca.first_name,
            last_name: context.params.arca.last_name
          });
        },

        async context => {
          //await context.app.service('users').update(context.result.id, )
          await context.params
            .db("users")
            .where("id", "=", context.result.id)
            .update({
              id_person: person.id
            });
        },

        async context => {
          const jwt = await context.app.service("authentication").create({
            email: context.result.email,
            password: context.params.arca.password,
            strategy: "local"
          });

          context.params.headers = [
            {
              key: "Content-Type:",
              value: "application/json"
            },

            {
              key: "Auhorization",
              value: "Bearer " + jwt.accessToken
            }
          ];

          return context;
        }
      ]
    }
  }
};
