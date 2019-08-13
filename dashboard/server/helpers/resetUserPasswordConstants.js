const responseAnswer = {
  success: `If this email address exists in
  our database we will have
  sent you a verification link.
  Wait for 1 minute and if the email does not arrive soon,
  check your spam folder.`
};

const emailNotSpecified = { error: 'Email must be specified!' };

module.exports = {
  responseAnswer,
  emailNotSpecified,
};
