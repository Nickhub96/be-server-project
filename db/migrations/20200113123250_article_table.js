exports.up = function(knex) {
  return knex.schema.createTable("articles", article_table => {
    article_table.increments("article_id").primary();
    article_table.string("title");
    article_table.text("body");
    article_table.integer("votes");
    article_table.string("topic").references("topics.slug");
    article_table.string("author").references("users.username");
    article_table.timestamp("created_at");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("articles");
};
