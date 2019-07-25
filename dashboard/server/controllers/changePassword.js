const models = require("../models");
const { isPasswordMatch, getHashedPassword } = require("../helpers/passwordHelpers");

const { user: User } = models;

// Should take email, new password and old password
// supposed that validation of new password is on frontend side
// endpoint for it is POST to /api/user/changePassword
async function changePassword(req, res) {
  const data = req.body;
  const { email, oldPassword, newPassword } = data;

  if (!email || !oldPassword || !newPassword) {
    return res.status(400).send("Email and password must be specified!");
  }

  try {
    const searchedUser = await User.findOne({
      where: { email },
      attributes: ['password', 'id'],
    });
  
    if (!searchedUser) {
      return res.status(404).send("User not found!");
    }

    const isPassMatch = isPasswordMatch(oldPassword, searchedUser.password);
    if (!isPassMatch) {
      return res.status(400).send("Old password is incorrect!");
    }

    const hashedPassword = getHashedPassword(newPassword);

    const passwordChangeresult = await User.update(
      { password: hashedPassword },
      { where: { id: searchedUser.id }},
    ).then(res => {
      if (res) return "Password successfully updated.";
    }).catch(err => {
      console.error(err);
      res.status(500);
      return err.message;
    });

    return res.json(passwordChangeresult);
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
}

module.exports = {
  changePassword,
};
