exports.up = function(knex) {
  return knex.schema.createTable("topics", topic_table => {
    topic_table
      .string("slug")
      .primary()
      .unique()
      .notNullable();
    topic_table.string("description").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("topics");
};
