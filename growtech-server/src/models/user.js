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
          if (context.params.authentication.accessToken === undefined) {
            //AUTO CADASTROS

            if ((context.data.permissions = "commercial"))
              context.data.permissions = "member";
          } else {
            context = await authenticate("jwt")(context);

            let autheticatedUser = context.params.user;
            let userAuthPerm = autheticatedUser.permissions.split(".");

            if (!userAuthPerm.includes("iclub_adm")) {
              throw new Forbidden(
                "É necessario privilégios para realiza a operação"
              );
            }
          }

          context.params.arca = {
            first_name: context.data.first_name,
            last_name: context.data.last_name,
            accepted_term: context.data.accepted_term,
            id_term: context.data.id_term,
            password: context.data.password,
            permissions: context.data.permissions,
            corporate_name: context.data.corporate_name,
            fancy_name: context.data.fancy_name,
            email_legal_person: context.data.email_legal_person,
            doc_number: context.data.doc_number,
            id_type_doc: context.data.id_type_doc
          };

          //remove atributos do objeto
          //_.omit(context.data, [
          //   "first_name",
          //   "last_name",
          //   "accepted_term",
          //  "id_term"
          //]);
          //ou

          delete context.data.first_name;
          delete context.data.last_name;
          delete context.data.accepted_term;
          delete context.data.id_term;
          delete context.data.email_legal_person;
          delete context.data.doc_number;
          delete context.data.id_type_doc;
          delete context.data.fancy_name;
          delete context.data.corporate_name;

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
          //Se cadastro realizado por terceiro
          if (context.params.authentication.accessToken !== undefined) {
            jwt = context.params.authentication.accessToken;
            var loggedUserId = decode(jwt).sub;

            if (context.params.arca.permissions === "distributor") {
              const legal_person = await context.app
                .service("legal-person")
                .create({
                  corporate_name: context.params.arca.corporate_name,
                  fancy_name: context.params.arca.fancy_name,
                  email: context.params.arca.email_legal_person,
                  doc_number: context.params.arca.doc_number,
                  id_doc_type: context.params.arca.id_type_doc
                });

              const distributor = await context.app
                .service("distributor")
                .create({
                  id_legal_person: legal_person.id
                });

              // credencia usuario cadastrado por terceiro
              await context.app.service("credentials").create({
                id_user: context.result.id,
                id_authorized_by_user: loggedUserId,
                authorized_at: moment().format(),
                active: true,
                id_distributor: distributor.id
              });
            }
            //TODO outros fluxos de cadastro
          } else {
            //Se cadastro realizado pelo proprio membro

            member = await context.app.service("member").create({
              id_term: context.params.arca.id_term,
              accepted_term: context.params.arca.accepted_term
            });

            await context.app.service("credentials").create({
              id_user: context.result.id,
              active: true,
              id_member: member.id
            });

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
        }
      ]
    }
  }
};
