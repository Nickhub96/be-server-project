# Back-End NC-News

In this repo you can use all the endpoints I have created to collect different sets of Data. The data tables have been created using SQL, Knex is used through out the repo to help with the collection of data through the various endpoints.

## Requirements

you will need to install :
-express
-postgres
-knex
-supertest
-mocha
-chai

install all with

```bash
npm install
```

## Endpoints

{
"GET /api": {
"description": "serves up a json representation of all the available endpoints of the api"
},
"GET /api/topics": {
"description": "serves an array of all topics",
"queries": [],
"exampleResponse": {
"topics": [{ "slug": "football", "description": "Footie!" }]
}
},
"GET /api/users/:username": {
"description": "serves an object of a single user when given their username",
"queries": [],
"exampleResponse": {
"user": {
"username": "butter_bridge",
"avatar_url": "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
"name": "jonny"
}
}
},
"GET /api/articles/:article_id": {
"description": "serves an object of a single article when given their article_id",
"queries": [],
"exampleResponse": {
"article": {
"article_id": 2,
"title": "Sony Vaio; or, The Laptop",
"body": "this is a comment",
"votes": 0,
"topic": "mitch",
"author": "icellusedkars",
"created_at": "2014-11-16T12:21:54.171Z",
"comment_count": 0
}
}
},
"PATCH /api/articles/:article_id": {
"description": "serves an object of a single article that has had change made to it",
"queries": [],
"exampleResponse": {
"article": {
"article_id": 2,
"title": "Sony Vaio; or, The Laptop",
"body": "this is another comment",
"votes": 6,
"topic": "mitch",
"author": "icellusedkars",
"created_at": "2014-11-16T12:21:54.171Z"
}
}
},
"POST /api/articles/:article_id/comments": {
"description": "serves an object of the comment that has been posted to the article_id",
"queries": [],
"exampleResponse": {
"comment": {
"comment_id": 19,
"author": "butter_bridge",
"article_id": 1,
"votes": 0,
"created_at": "2020-01-22T13:53:12.660Z",
"body": "This is just a short comment that I want to add to check my test works, and im able to post comments when I use an article id to do so. Hope this works."
}
}
},
"GET /api/articles/:article_id/comments": {
"description": "serves an array of objects containing all the comments from a given article_id",
"queries": ["sort_by", "order"],
"exampleResponse": {
"comments": [
{
"comment_id": 14,
"author": "icellusedkars",
"article_id": 5,
"votes": 16,
"created_at": "2004-11-25T12:36:03.389Z",
"body": "What do you see? I have no idea where this will lead us. This place I speak of, is known as the Black Lodge."
},
{
"comment_id": 15,
"author": "butter_bridge",
"article_id": 5,
"votes": 1,
"created_at": "2003-11-26T12:36:03.389Z",
"body": "I am 100% sure that we're not completely sure."
}
]
}
},
"GET /api/articles": {
"description": "serves an array of all topics",
"queries": ["author", "topic", "sort_by", "order"],
"exampleResponse": {
"articles": [
{
"title": "Seafood substitutions are increasing",
"topic": "cooking",
"author": "weegembump",
"body": "Text from the article..",
"created_at": 1527695953341
}
]
}
},
"PATCH /api/comments/:comment_id": {
"description": "serves an object of single comment that has had a change made to it",
"queries": [],
"exampleResponse": {
"comment": {
"comment_id": 4,
"author": "icellusedkars",
"article_id": 1,
"votes": -94,
"created_at": "2014-11-23T12:36:03.389Z",
"body": " I carry a log — yes. Is it funny to you? It is not to me."
}
}
},
"DELETE /api/comments/:comment_id": {
"description": "deletes the comment of any given comment_id",
"queries": [],
"exampleResponse": 1
}
}

## Github and Heroku link

Github - https://github.com/Nickhub96/be-server-project

Heroku - https://git.heroku.com/be-server-project.git

## Authors

Northcoders Team

Nick Farrer - Northcoder
