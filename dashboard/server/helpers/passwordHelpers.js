const models = require("../models");
const bcrypt = require("bcrypt");
const cryptoRandomString = require('crypto-random-string');
const moment = require("moment");

require('dotenv-safe').config();

const { user: User } = models;

const RESET_TOKEN_LIVE_DAYS = 7;
const TOKEN_LENGTH = 32;

async function generateResetPasswordToken() {
  const resetToken = await cryptoRandomString({ length: TOKEN_LENGTH, type: 'url-safe' });
  const time = Math.floor(new Date().getTime() / 1000);
  const passwordResetToken = `${resetToken}_${time}`;
  return passwordResetToken;
}

function isPasswordMatch(comparablePassword, password) {
  return bcrypt.compareSync(comparablePassword, password);
}

function getHashedPassword(password) {
  return bcrypt.hashSync(password, parseInt(process.env.SALT_ROUNDS));
}

function isResetPassTokenExpired(token) {
  const tokenCreatingTime = parseInt(token.slice(TOKEN_LENGTH + 1)) * 1000;
  const currentTime = new Date().getTime();
  if (tokenCreatingTime > currentTime) return true;

  const timeDiff = currentTime - tokenCreatingTime;
  const millisecondsInDay = 1000 * 60 * 60 * 24; // milliseconds, seconds, minutes, hours
  const diffInDays = Math.ceil(timeDiff / millisecondsInDay);
  if (diffInDays > RESET_TOKEN_LIVE_DAYS) return true;
  return false;
}

function resetTokenExpiredTime(token) {
  const tokenCreatingTime = parseInt(token.slice(TOKEN_LENGTH + 1)) * 1000;
  const millisecondsToDie = 1000 * 60 * 60 * 24 * RESET_TOKEN_LIVE_DAYS;
  const expiredTime = tokenCreatingTime + millisecondsToDie;
  const tokenExpiredTime = moment(expiredTime).format('MMMM Do YYYY, h:mm:ss a');
  return tokenExpiredTime;
}

async function updateUserPassword(newPassword, userId) {
  const hashedPassword = getHashedPassword(newPassword);

  const passwordChangeresult = await User.update(
    {
      password: hashedPassword,
      password_reset_token: '',
    },
    { where: { id: userId }},
  ).then(result => {
    if (result[0]) {
      return { success: "Password successfully updated." };
    } else {
      return { error: "Something went wrong.", status: 500 };
    }
  }).catch(err => {
    console.error(err);
    return { error: err.message, status: 500 };
  });

  return passwordChangeresult;
}


module.exports = {
  isPasswordMatch,
  getHashedPassword,
  generateResetPasswordToken,
  isResetPassTokenExpired,
  resetTokenExpiredTime,
  updateUserPassword,
};
