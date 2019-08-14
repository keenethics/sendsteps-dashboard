const models = require('../models');
const {
  isResetPassTokenExpired,
  updateUserPassword,
  generateResetPasswordToken,
  resetTokenExpiredTime
} = require('../helpers/passwordHelpers');
const { isValidPassword } = require('../helpers/validationHelpers');
const {
  responseAnswer,
  emailNotSpecifiedError,
  missingTokenParamError,
  emptyTokenParamError,
  tokenTimeExpiredError,
  invalidTokenError,
  missedPassOrTokenError,
  passwordNotValidError,
  restoreTokenExpiredError,
  wrongRestoreTokenError
} = require('../helpers/resetUserPasswordConstants');
const { sendForgotEmail } = require('../emailSenders/forgotPasswordEmail');
require('dotenv-safe').config();

const { user: User } = models;


// This should generate restore password link and send it to user email
// Should take an email
// supposed that validation of email is on frontend side
// endpoint for it is POST to /api/user/requestPasswordReset
async function generateResetLink(req, res) {
  const { email } = req.body;
  const { origin } = req.headers;

  if (!email) {
    return res.status(400).send(emailNotSpecifiedError);
  }

  try {
    const password_reset_token = await generateResetPasswordToken();

    const updatedResult = await User.update({ password_reset_token }, { where: { email } })
      .then(res => {
        if (res[0]) {
          const restoreLink = `${origin}/reset-password?token=${password_reset_token}`;
          sendForgotEmail(email, restoreLink);
        }

        return responseAnswer;
      })
      .catch(err => {
        console.error(err);
        return { error: err.message };
      });

    // TODO Probably should return only success answer, not a error?
    return res.json(updatedResult || responseAnswer);
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
}

// This should reset password by restore token
// Should take new password and password_reset_token
// supposed that validation of password is on frontend side
// endpoint for it is POST to /api/user/resetUserPassword
async function resetUserPassword(req, res) {
  const { newPassword, token } = req.body;
  if (!newPassword || !token) {
    return res.status(400).send(missedPassOrTokenError);
  }
  if (!isValidPassword(newPassword)) {
    return res.status(400).send(passwordNotValidError);
  }

  const isTokenExpired = isResetPassTokenExpired(token);

  if (isTokenExpired) {
    return res.status(401).json(restoreTokenExpiredError);
  }

  try {
    const searchedUser = await User.findOne({
      where: { password_reset_token: token },
      attributes: ['id', 'email']
    });

    if (!searchedUser) {
      return res.status(404).json(wrongRestoreTokenError);
    }

    const { success, error, status } = await updateUserPassword(newPassword, searchedUser.id);
    if (status) res.status(status);

    return res.json({ success, email: searchedUser.email } || { error });
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
}

// This should validate restore token
// Should take password_reset_token
// endpoint for it is POST to /api/user/resetPassword?token=YOUR_RESTORE_TOKEN
async function checkPasswordResetLink(req, res) {
  const token = req.query.token;
  if (typeof token === 'undefined') {
    return res.status(500).json(missingTokenParamError);
  }
  if (!token) {
    return res.status(500).json(emptyTokenParamError);
  }
  if (isResetPassTokenExpired(token)) {
    const expiredTime = resetTokenExpiredTime(token);
    return res.status(401).json(tokenTimeExpiredError(expiredTime));
  }
  const searchedUser = await User.findOne({
    where: { password_reset_token: token },
    attributes: ['id']
  });
  if (!searchedUser) {
    return res.status(404).json(invalidTokenError);
  }
  res.send({ success: 'token valid' });
}

module.exports = {
  generateResetLink,
  resetUserPassword,
  checkPasswordResetLink
};
