const parser = require('ua-parser-js');
const jwt = require('jsonwebtoken');
const models = require('../models');
const destructurizationHelper = require('../helpers/destructurizationHelper');
const { isValidEmail, isValidPassword } = require('../helpers/validationHelpers');
// for using .env variables
require('dotenv-safe').config({ allowEmptyValues: true });

const { user: User } = models;

function validateData(data) {
  const { email, password } = data;
  const errors = {};

  if (!isValidEmail(email)) {
    errors.email = 'email is invalid';
  }

  if (!isValidPassword(password)) {
    errors.password = 'password must be from 6 to 40 characters long';
  }

  return errors;
}

async function getUser(req, res) {
  const enteredInfo = req.body;
  const { email, password } = enteredInfo;

  if (!email || !password) {
    return res.status(400).send('email and password must be specified');
  }

  const errors = validateData(enteredInfo);
  if (Object.keys(errors).length !== 0) {
    return res.status(400).json({
      errors
    });
  }

  try {
    const searchedUser = await User.findOne({
      where: { email }
    });

    if (!searchedUser) {
      return res.status(404).send('User not found!');
    }

    const isPassMatch = searchedUser.comparePassword(password);
    if (!isPassMatch) {
      return res.status(400).send('Password incorrect!');
    }

    // Generating JWT token
    const token = jwt.sign({ email }, process.env.JWT_PRIVATE_KEY, {
      algorithm: 'HS256'
    });

    // Changing some user info on login
    const { browser, os } = parser(req.headers['user-agent']);

    const updateInfo = destructurizationHelper(
      { browser: browser.name, os: `${os.name} ${(os.version ? os.version : '')}` },
      'os',
      'browser'
    );

    if (updateInfo) {
      await User.update(
        { ...updateInfo },
        {
          where: { email }
        }
      );
    }

    return res.json({
      jwt: token
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
}

async function getUserData(req, res) {
  try {
    const userData = await User.findOne({
      where: { email: req.user.email }
    });

    if (!userData) {
      return res.status(400).json({ message: 'Wrong token. User not found' });
    }

    return res.json({
      userId: userData.id,
      userType: userData.role,
      firstName: userData.firstName,
      lastName: userData.lastName,
      profilePic: userData.filename,
      isGuidedTourTake: userData.isGuidedTourTake,
      authorized: true
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
}

module.exports = {
  getUser,
  getUserData
};
