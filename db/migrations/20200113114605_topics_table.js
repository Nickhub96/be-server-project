exports.up = function(knex) {
  return knex.schema.createTable("topics", topic_table => {
    topic_table
      .string("slug")
      .primary()
      .unique();
    topic_table.string("description");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("topics");
};
