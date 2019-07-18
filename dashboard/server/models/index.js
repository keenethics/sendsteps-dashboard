const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const fromPairs = require('lodash/fromPairs');
const { connectionParams, config } = require('../config/database')

const basename = path.basename(__filename);

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
