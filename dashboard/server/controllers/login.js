const models = require('../models');
const jwt = require('jsonwebtoken');
const destructurizationHelper = require('../helpers/destructurizationHelper');
// for using .env variables
require('dotenv-safe').config({ allowEmptyValues: true });

const { user: User } = models;

async function getUser(req, res) {
  const enteredInfo = req.body;
  const { email, password } = enteredInfo;

  if (!email || !password) {
    return res.status(400).send('email and password must be specified');
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
    const updateInfo = destructurizationHelper(enteredInfo, 'os', 'browser');

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
      return res.status(400).send('Wrong token. User not found');
    }

    return res.json({
      userId: userData.id,
      userType: userData.role,
      firstName: userData.firstName,
      lastName: userData.lastName
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
