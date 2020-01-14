exports.up = function(knex) {
  return knex.schema.createTable("comments", comment_table => {
    comment_table
      .increments("comment_id")
      .primary()
      .unique();
    comment_table.string("author").references("users.username");
    comment_table.integer("article_id").references("articles.article_id");
    comment_table.integer("votes");
    comment_table.timestamp("created_at");
    comment_table.text("body");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("comments");
};
