#### Pagination

To make sure that an API can handle large amounts of data, it is often necessary to use **pagination**. Head over to [Google](https://www.google.co.uk/search?q=cute+puppies), and you will notice that the search results are broken down into pages. It would not be feasible to serve up _all_ the results of a search in one go. The same is true of websites / apps like Facebook or Twitter (except they hide this by making requests for the next page in the background, when we scroll to the bottom of the browser). We can implement this functionality on our `/api/articles` and `/api/comments` endpoints.

```http
GET /api/articles
```

- Should accepts the following queries:
  - `limit`, which limits the number of responses (defaults to 10)
  - `p`, stands for page which specifies the page at which to start (calculated using limit)
- add a `total_count` property, displaying the total number of articles (**this should display the total number of articles with any filters applied, discounting the limit**)

---

```http
GET /api/articles/:article_id/comments
```

Should accept the following queries:

- `limit`, which limits the number of responses (defaults to 10)
- `p`, stands for page which specifies the page at which to start (calculated using limit)

#### More Routes

```http
POST /api/articles

DELETE /api/articles/:article_id

POST /api/topics

POST /api/users
GET /api/users
```
