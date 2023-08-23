# Backend Engineer Worksample

Finished backend engineer worksample by Maris Jirgens

## Scripts

`npm start` starts the server

`npm test` executes the tests

## Usage

One endpoint available: `/users` which accepts `GET` and `POST` requests

On `GET` request, returns all users present in the database, and can be given a `created` query key with values `asc` or `desc` to sort users by creation date

On `POST` request, accepts body in the shape of:

```json
{
   "name": "Foo Bar",
   "email": "foo.bar@example.com"
}
```

The included sqlite database is pre-filled with some data already
