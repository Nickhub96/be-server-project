exports.up = function(knex) {
  return knex.schema.createTable("comments", comment_table => {
    comment_table
      .increments("comment_id")
      .primary()
      .unique()
      .notNullable();
    comment_table
      .string("author")
      .references("users.username")
      .notNullable();
    comment_table
      .integer("article_id")
      .references("articles.article_id")
      .notNullable();
    comment_table
      .integer("votes")
      .notNullable()
      .defaultTo(0);
    comment_table
      .timestamp("created_at")
      .defaultTo(knex.fn.now())
      .notNullable();
    comment_table.text("body").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("comments");
};
