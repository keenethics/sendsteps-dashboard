const express = require('express');
const models = require('../models');
const router = express.Router();
const { user: User } = models;

router.route('/').post(async (req, res) => {
  console.log('THIS IS TEST');
  const searchedUser = await User.findOne({ where: {email: 'ananda.jenny@sendsteps.com' }});
  if (searchedUser) {
    console.log(searchedUser.id, '<USER id');
    console.log(searchedUser.email, '<USER email');
  }
  return res.send({ message: 'message from test' });
});

module.exports = router;
