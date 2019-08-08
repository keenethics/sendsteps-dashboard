require('dotenv-safe').config(); // Required for sequelize-cli to load .env

const config = {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  port: process.env.DB_PORT,
  define: {
    timestamps: false
  },
};

module.exports = {
  development: {
    connectionParams: {
      dbname: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
    },
    config,
  },
  test: {
    connectionParams: {
      dbname: process.env.DB_NAME_TEST,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
    },
    config,
  }
};
