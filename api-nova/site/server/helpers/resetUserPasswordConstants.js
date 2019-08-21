const responseAnswer = {
  success: `If this email address exists in
  our database we will have
  sent you a verification link.
  Wait for 1 minute and if the email does not arrive soon,
  check your spam folder.`
};

const emailNotSpecifiedError = { error: 'Email must be specified!' };
const missingTokenParamError = { error: 'Missing required parameters: token' };
const emptyTokenParamError = { error: 'Password reset token cannot be blank.' };

const tokenTimeExpiredError = (expiredTime) => {
  return {
    error: `The token in this URL expired on
    ${expiredTime}.
    Click on 'Forgot password?' within the dashboard in order
    to generate a new token. Tokens are valid for 7 days.`
  };
}

const invalidTokenError = {
  error: `This token is not valid anymore.
  Please click on the latest email you received in order
  to activate your account or reset your password.`
}

const missedPassOrTokenError = { error: 'Password and token must be specified!' };
const passwordNotValidError = { error: 'Password must be from 6 to 40 characters long' };
const restoreTokenExpiredError = { error: 'Restore token has expired!' };
const wrongRestoreTokenError = { error: 'User not found! Invalid restore token.' }

module.exports = {
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
};
