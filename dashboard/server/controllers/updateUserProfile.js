const destructurizationHelper = require('../helpers/destructurizationHelper');
const { user: User, accounts: Account } = require('../models');

async function updateUserProfile(req, res) {
  const enteredInfo = req.body;
  const { id } = enteredInfo;

  try {
    const currentUser = await User.findOne({
      where: {
        id
      }
    });

    const updatedUser = await User.update(
      {
        ...destructurizationHelper(
          enteredInfo,
          'firstName',
          'lastName',
          'email',
          'departmentName',
          'language',
          'phonenumber',
          'filename'
        )
      },
      {
        where: {
          id
        }
      }
    );

    const updatedAccount = await Account.update(
      {
        ...destructurizationHelper(
          enteredInfo,
          'country',
          'postalCode',
          'city',
          'address',
          'university',
          'timezone',
          'vatId'
        )
      },
      {
        where: {
          id: currentUser.accountId
        }
      }
    );

    res.json({
      message: 'User profile updated!',
      updatedUser,
      updatedAccount
    });
  } catch (error) {
    return res.status(500).send(error);
  }
}

module.exports = updateUserProfile;
