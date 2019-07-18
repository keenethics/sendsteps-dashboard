const models = require('../models');

const { user: User } = models;

async function returnUsers(req, res) {
  try {
    return res.json(req.user);
  } catch (err) {
    return res.status(500).send(err)
  }
}

module.exports = {
  returnUsers,
};