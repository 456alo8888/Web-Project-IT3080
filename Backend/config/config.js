// config/config.js or config/config.mjs
import 'dotenv/config';

export default {
  development: {
    username: process.env.DB_USERNAME || "hoaralavay",
    password: process.env.DB_PASSWORD || "123456",
    database: process.env.DB_NAME || "mydatabase",
    host: process.env.DB_HOST || "localhost",
    dialect: process.env.DB_DIALECT || "mysql"
  },
  test: {
    username: process.env.DB_USERNAME_TEST,
    password: process.env.DB_PASSWORD_TEST,
    database: process.env.DB_NAME_TEST,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
  },
  production: {
    username: process.env.DB_USERNAME_PROD,
    password: process.env.DB_PASSWORD_PROD,
    database: process.env.DB_NAME_PROD,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    dialectOptions: {
      ssl: true
    }
  }
};
