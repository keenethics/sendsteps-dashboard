const models = require("../models");
const { isPasswordMatch, updateUserPassword } = require("../helpers/passwordHelpers");

const { user: User } = models;

// Should take email, new password and old password
// supposed that validation of new password is on frontend side
// endpoint for it is POST to /api/user/changePassword
async function changePassword(req, res) {
  const { email, oldPassword, newPassword } = req.body;

  if (!email || !oldPassword || !newPassword) {
    return res.status(400).json({ error: "Email and password must be specified!" });
  }

  try {
    const searchedUser = await User.findOne({
      where: { email },
      attributes: ['password', 'id'],
    });
  
    if (!searchedUser) {
      return res.status(404).json({ error: "User not found!" });
    }

    const isPassMatch = isPasswordMatch(oldPassword, searchedUser.password);
    if (!isPassMatch) {
      return res.status(400).json({ error: "Old password is incorrect!" });
    }


    const { success, error, status } = await updateUserPassword(newPassword, searchedUser.id);
    if (status) res.status(status);

    return res.json(success || error);
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
}

module.exports = {
  changePassword,
};
