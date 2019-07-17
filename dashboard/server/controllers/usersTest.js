const models = require('../models');

const { user: User } = models;

async function returnUsers(req, res) {
  try {
    const users = await User.findAll();
    return res.send(users);
  } catch (err) {
    return res.status(500).send(err)
  }
}

module.exports = {
  returnUsers,
};