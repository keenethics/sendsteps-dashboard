const models = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// for using .env variables
require("dotenv-safe").config({ allowEmptyValues: true });

const { user: User } = models;

async function getUser(req, res) {
  const enteredInfo = req.body;
  const { email, password } = enteredInfo;

  if (!email || !password) {
    return res.status(400).send("email and password must be specified");
  }

  try {
    const searchedUser = await User.findOne({
      where: { email }
    });

    if (!searchedUser) {
      return res.status(404).send("User not found!");
    }

    const isPassMatch = bcrypt.compareSync(password, searchedUser.password);
    if (!isPassMatch) {
      return res.status(400).send("Password incorrect!");
    }

    // Generation JWT token
    const token = jwt.sign({ email, password }, process.env.JWT_PRIVATE_KEY, {
      algorithm: "HS256"
    });

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

    console.log(req.user);

    if (!userData) {
      return res.status(400).send("Wrong token. User not found");
    }

    return res.json({
      userId: userData.id,
      userType: userData.role
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
