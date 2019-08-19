const Sequelize = require('sequelize');

const {
  sessions: Sessions,
  tab_settings: tabSettings,
  tab_status: tabStatus,
} = require('../models');

async function getData(req, res) {
  return res.sendStatus(200);
}

module.exports = {
  getData,
};
