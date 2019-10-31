exports.up = function(knex) {
  return knex.schema
    .createTable("users", table => {
      table
        .increments("id")
        .unsigned()
        .primary();
      table.string("permissions", 255);
      table.string("cellphone_number", 20);
      table.dateTime("cellphone_confirmation_date");
      table
        .string("email", 50)
        .notNullable()
        .unique();
      table.string("password").notNullable();
      table
        .timestamp("created_at")
        .notNullable()
        .defaultTo(knex.raw("current_timestamp"));
      table.timestamp("updated_at");
      table.timestamp("last_access");
      table
        .boolean("active")
        .notNullable()
        .defaultTo(false);
    })
    .then(function() {
      return knex("users").insert([
        {
          permissions: "admin",
          cellphone_number: "+55 61 999999999",
          email: "andre@gmail.com",
          password:
            "$2a$10$RTpo6nMOa/uPECfk5V1EnuxDvspFf5HrdxyfRel3PTvG9K5nt08LO"
        },
        {
          permissions: "admin",
          cellphone_number: "+55 61 988888888",
          email: "rafael@gmail.com",
          password:
            "$2a$10$RTpo6nMOa/uPECfk5V1EnuxDvspFf5HrdxyfRel3PTvG9K5nt08LO"
        },
        {
          permissions: "user",
          cellphone_number: "+55 61 998487797",
          email: "lerototi@gmail.com",
          password:
            "$2a$10$RTpo6nMOa/uPECfk5V1EnuxDvspFf5HrdxyfRel3PTvG9K5nt08LO"
        },
        {
          permissions: "user",
          cellphone_number: "+55 61 977777777",
          email: "junne@gmail.com",
          password:
            "$2a$10$RTpo6nMOa/uPECfk5V1EnuxDvspFf5HrdxyfRel3PTvG9K5nt08LO"
        }
      ]);
    });
};

exports.down = function(knex) {
  return knex.schema.dropTable("users");
};
