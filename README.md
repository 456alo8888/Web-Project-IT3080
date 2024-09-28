# How to run

You need `node` with support for `ES6`, and start a `mysql` server before running.

1. Create `mydatabase` database:

```
$ [mysql] > CREATE DATABASE mydatabase
```

1. `npm install`
1. Migrate:

```
$ npm run migrate
```

1. Copy `.env.example` to `.env` and modify
1. `node index.js`
