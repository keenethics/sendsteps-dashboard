const bcrypt = require("bcrypt");

require('dotenv-safe').config();

function isPasswordMatch(comparablePassword, password) {
  return bcrypt.compareSync(comparablePassword, password);
}

function getHashedPassword(password) {
  return bcrypt.hashSync(password, parseInt(process.env.SALT_ROUNDS));
}


module.exports = {
  isPasswordMatch,
  getHashedPassword,
};
