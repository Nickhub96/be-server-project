exports.up = function(knex) {
  return knex.schema.createTable("users", user_table => {
    user_table
      .string("username")
      .primary()
      .unique();
    user_table.string("avatar_url");
    user_table.string("name");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("users");
};
