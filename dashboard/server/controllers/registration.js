const models = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// for using .env variables
require('dotenv-safe').config();

const { user: User } = models;

async function registerUser(req, res) {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res
      .status(400)
      .json({
        error: 'firstName, lastName, email and password must be specified'
      });
  }

  try {
    const checkedUser = await User.findOne({
      where: { email }
    });

    if (checkedUser) {
      return res.status(409).json({ error: 'Email is already in use.' });
    }

    const createdUser = await User.create({
      firstName,
      lastName,
      email,
      password,
      accountId: 0,
      emailUnconfirmed: '',
      auth_key: '',
      role: 'admin',
      isDeleted: 0,
      createdDate: new Date().toLocaleString(),
      lastUsedDate: new Date().toLocaleString(),
      created_at: Math.round(Date.now() / 1000),
      updated_at: Math.round(Date.now() / 1000),
      moderatorSharingToken: ''
    });

    console.log('Created user:', createdUser);

    // Generation JWT token
    const token = jwt.sign({ email }, process.env.JWT_PRIVATE_KEY, {
      algorithm: 'HS256'
    });

    return res.json({
      jwt: token,
      userId: createdUser.id,
      userType: createdUser.role
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
}

module.exports = {
  registerUser
};
