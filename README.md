# Github API

An application for fetching details of any Github handle.
In this project we have used following dependencies.

- [x] node
- [x] express
- [x] react
- [x] cors
- [x] axios
- [x] eslint-config-prettier
- [x] joi
- [x] lodash
- [x] mongoose
- [x] swagger-jsdoc
- [x] swagger-ui-express

## Author

- [@deqodepratik](https://www.github.com/deqodepratik)

## Swagger API Reference

Swagger API can be accessed from [http://localhost:3300/api]()

## Install MongoDB

https://www.mongodb.com/try/download/community?tck=docs_server

#### Get user details

```http

GET /{user}

```

| Parameter | Type | Description |

| :-------- | :------- | :------------------------------- |

| `user` | `string` | **Required**. Github user handle |

#### Get user repositories

```http

GET /repo/{user}

```

| Parameter | Type | Description |

| :-------- | :------- | :------------------------------------------ |

| `user` | `string` | **Required**. Github username to fetch repo |

## Environment Variables

To run this project, you will need to add the following environment variables to your server `.env` file

`MONGO_DB_URI`

## Run Locally

Clone the project

```bash

git clone https://github.com/deqodepratik/github-assignment.git

```

Go to the project directory

```bash

cd github-assignment

```

Install dependencies

```bash

npm install

```

Install both client and server side dependencies with npm

```bash

npm run getpkg

```

Start the server

```bash

npm start

```
