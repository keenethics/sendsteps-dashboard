require('dotenv-safe').config(); // Required for sequelize-cli to load .env

module.exports = {
  connectionParams: {
    dbname: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  },
  config: {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  },
};
