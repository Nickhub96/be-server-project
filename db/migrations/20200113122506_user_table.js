exports.up = function(knex) {
  return knex.schema.createTable("users", user_table => {
    user_table
      .string("username")
      .primary()
      .unique()
      .notNullable();
    user_table.string("avatar_url").notNullable();
    user_table.string("name").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("users");
};
