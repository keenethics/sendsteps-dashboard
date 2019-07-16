const models = require('../models');

const { TestUser } = models;


async function returnTestData(req, res) {
  try {
    const users = await TestUser.findAll();
    return res.send(users);
  } catch (err) {
    return res.status(500).send(err)
  }
}

module.exports = {
  returnTestData,
};