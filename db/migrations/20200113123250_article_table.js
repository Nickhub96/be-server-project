exports.up = function(knex) {
  return knex.schema.createTable("articles", article_table => {
    article_table
      .increments("article_id")
      .primary()
      .notNullable();
    article_table.string("title").notNullable();
    article_table.text("body").notNullable();
    article_table
      .integer("votes")
      .notNullable()
      .defaultTo(0);
    article_table
      .string("topic")
      .references("topics.slug")
      .notNullable();
    article_table
      .string("author")
      .references("users.username")
      .notNullable();
    article_table
      .timestamp("created_at")
      .defaultTo(knex.fn.now())
      .notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("articles");
};
