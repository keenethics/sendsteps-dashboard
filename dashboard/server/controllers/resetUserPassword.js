const mandrill = require('mandrill-api/mandrill');
const models = require("../models");
const {
  isResetPassTokenExpired,
  updateUserPassword,
  generateResetPasswordToken,
  resetTokenExpiredTime,
} = require("../helpers/passwordHelpers");
require('dotenv-safe').config();

const MANDRILL_API_KEY = process.env.MANDRILL_API_KEY;

const { user: User } = models;

const responseAnswer = {
  success: `If this email address exists in
  our database we will have
  sent you a verification link.
  Wait for 1 minute and if the email does not arrive soon,
  check your spam folder.`
};


function sendForgetEmail(email, resetPasswordUrl) {
  mandrill_client = new mandrill.Mandrill(MANDRILL_API_KEY);

  mandrill_client.messages.sendTemplate(
    {
      template_name: 'forgot-password',
      template_content: [],
      message: {
        subject: 'Forgot your password?',
        from_email: 'support@sendsteps.com',
        to: [
          {
            email,
            type: 'to'
          }
        ],
        global_merge_vars: [
          {
            name: 'RESETPASSWORDURL',
            content: resetPasswordUrl
          }
        ]
      },
      async: false
    },
    result => {
      console.log(result);
    },
    e => {
      console.log(`'A mandrill error occurred: ${e.name} - ${e.message}`);
    }
  );
}

// This should generate restore password link and send it to user email
// Should take an email
// supposed that validation of email is on frontend side
// endpoint for it is POST to /api/user/requestPasswordReset
async function generateResetLink(req, res) {
  const { email } = req.body;
  const { host } = req.headers;

  if (!email) {
    return res.status(400).send({ error: "Email must be specified!" });
  }

  try {
    const password_reset_token = await generateResetPasswordToken();

    const updatedResult = await User.update(
      { password_reset_token },
      { where: { email }},
    ).then(res => {
      if (res[0]) {
        console.log(res);
        const restoreLink = `${host}/reset-password?token=${password_reset_token}`;
        sendForgetEmail(email, restoreLink);

        // TODO This is for test, should be removed, should not to return restoreLink!!!!
        return { ...responseAnswer, restoreLink };
      }
      return responseAnswer;
    }).catch(err => {
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
    return res.status(400).send({ error: "Password and token must be specified!" });
  }

  const isTokenExpired = isResetPassTokenExpired(token);

  if (isTokenExpired) {
    return res.status(401).json({ error: "Restore token has expired!" });
  }

  try {
    const searchedUser = await User.findOne({
      where: { password_reset_token: token },
      attributes: ['id', 'email'],
    });
  
    if (!searchedUser) {
      return res.status(404).json({ error: "User not found! Invalid restore token." });
    }

    const { success, error, status } = await updateUserPassword(newPassword, searchedUser.id);
    if (status) res.status(status);

    return res.json({ success, email: searchedUser.email  } || { error });
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
}

// This should validate restore token
// Should take password_reset_token
// endpoint for it is POST to /api/user/resetPassword?token=YOUR_RESTORE_TOKEN
async function checkPasswordResetLink(req, res) {
  const token = req.query.token || req.body.token;
  if (typeof token === "undefined") {
    return res.status(500).json({
      error: "Missing required parameters: token",
    })
  }
  if (!token) {
    return res.status(500).json({
      error: "Password reset token cannot be blank.",
    })
  }
  if (isResetPassTokenExpired(token)) {
    const expiredTime = resetTokenExpiredTime(token);
    return res.status(401).json({
      error: "The token in this URL expired on " + expiredTime +
      ". Click on 'Forgot password?' within the dashboard in order" +
      "to generate a new token. Tokens are valid for 7 days.",
    });
  }
  const searchedUser = await User.findOne({
    where: { password_reset_token: token },
    attributes: ['id'],
  });
  if (!searchedUser) {
    return res.status(404).json({
      error: "This token is not valid anymore. " +
      "Please click on the latest email you received in order " +
      "to activate your account or reset your password.",
    });
  }
  res.send({ success: "token valid" });
}

module.exports = {
  generateResetLink,
  resetUserPassword,
  checkPasswordResetLink,
};
