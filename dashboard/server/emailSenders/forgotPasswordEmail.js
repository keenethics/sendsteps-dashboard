const emailTemplate = require('./emailTemplate');

function sendForgotEmail(email, resetPasswordUrl) {
  const templateName = 'forgot-password';
  const subject = 'Reset Your Sendsteps Password';
  const vars = [
    {
      name: 'RESETPASSWORDURL',
      content: resetPasswordUrl
    }
  ];

  emailTemplate(templateName, subject, email, vars);
}

module.exports = { sendForgotEmail };
