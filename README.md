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

## Server

Ở đây mình chạy local nên sever sẽ là 

`http://localhost:4000/`

## Routes

Các routes tương ứng với các nhóm chức năng

```
// route cho admin

http://localhost:4000/api/admin/



// route cho khoản thu

http://localhost:4000/api/fee/



// route liên quan đến cư dân

http://localhost:4000/api/resident/



//route cho phần lịch sử

http://localhost:4000/api/history/
```

## Endpoint

```

http://localhost:4000/api/admin/

POST                        ...signup

Headers:
	roottoken : String
// Khác null là đc


Body:
{
	username : String,
	password : String,
	updateFeeAuth : String, // 'true' hoặc 'false'
	createFeeAuth : String,
	updateResidentAuth : String
}


Response:
{
	success : Boolean,
	message : String,
}
  


