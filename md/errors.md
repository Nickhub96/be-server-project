## Test Output

​
Read through all errors. Note that any failing test could be caused by a problem uncovered in a previous test on the same endpoint.
​

### PATCH `/api/topics`

​
Assertion: expected 404 to equal 405
​
Hints:
​

- use `.all()` on each route, to serve a 405: Method Not Found status code
  ​

### PATCH `/api/articles`

​
Assertion: expected 404 to equal 405
​
Hints:
​

- use `.all()` on each route, to serve a 405: Method Not Found status code
  ​
  ​

### PUT `/api/articles/1`

​
Assertion: expected 404 to equal 405
​
Hints:
​

- use `.all()` on each route, to serve a 405: Method Not Found status code
  ​

`
​

​

​

### PUT `/api/articles/1/comments`

​
Assertion: expected 404 to equal 405
​
Hints:
​

- use `.all()` on each route, to serve a 405: Method Not Found status code
  ​
  ​

### POST `/api/articles/1/comments` ****\*****

​
Assertion: expected 201 to equal 400
​
Hints:
​

- use a 400: Bad Request status code when `POST` request does not include all the required keys
- use `notNullable` in migrations for required columns
  ​

### POST `/api/articles/10000/comments` ****\*****

​
Assertion: expected 400 to be one of [ 404, 422 ]
​
Hints:
​

- use a 404: Not Found _OR_ 422: Unprocessable Entity status code when `POST` contains a valid article ID that does not exist

  ​

### PATCH `/api/comments/1`

​
Assertion: Cannot read property 'votes' of undefined
​
Hints:
​

- use 200: OK status code when sent a body with no `inc_votes` property
- send an unchanged comment when no `inc_votes` is provided in the request body
  ​

### PUT `/api/comments/1`

​
Assertion: expected 404 to equal 405
​
Hints:
​

- use `.all()` on each route, to serve a 405: Method Not Found status code
  ​

### DELETE `/api/comments/1`

​
Assertion: expected 404 to equal 204
​
Hints:
​

- use a 204: No Content status code
- do not return anything on the body
  ​

### DELETE `/api/comments/not-a-number`

​
Assertion: expected 404 to equal 400
​
Hints:
​

- use a 400: Bad Request when `DELETE` contains an invalid comment_id
  ​

### PUT `/api/users/butter_bridge`

​
Assertion: expected 404 to equal 405
​
Hints:
​

- use `.all()` on each route, to serve a 405: Method Not Found status code
  ​

### DELETE `/api`

​
Assertion: expected 404 to equal 405
​
Hints:
​

- use `.all()` on each route, to serve a 405: Method Not Found status code
  Collapse
