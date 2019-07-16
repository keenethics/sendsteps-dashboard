const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const fromPairs = require('lodash/fromPairs');

const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || 'development';
// const config = require(`${__dirname}/../config/database.js`)[env]; // eslint-disable-line
// 
// const connectionParams = config.use_env_variable
//   ? [process.env[config.use_env_variable]]
//   : [config.database, config.username, config.password];

const connectionParams = {
  dbname: 'testdb',
  username: 'root',
  password: 'pass',
}

const config = {
  host: 'localhost',
  dialect: 'mariadb',
}

const sequelize = new Sequelize(
  connectionParams.dbname,
  connectionParams.username,
  connectionParams.password,
  { ...config },
);

const models = fromPairs(
  fs
    .readdirSync(__dirname)
    .filter(file => (file !== basename) && file.endsWith('.js'))
    .map(file => sequelize.import(path.join(__dirname, file)))
    .map(model => [model.name, model]),
);

Object.values(models).filter(model => model.associate).forEach(model => model.associate(models));

module.exports = { sequelize, Sequelize, ...models };
