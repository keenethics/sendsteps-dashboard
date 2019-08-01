const destructurizationHelper = require('../helpers/destructurizationHelper');
const uploadPhotoToRackspace = require('../middlewares/rackspaceUploader');
const { user: User, accounts: Account } = require('../models');

async function updateUserProfile(req, res) {
  const enteredInfo = req.body;
  const file = req.file;
  const { id } = enteredInfo;

  try {
    const currentUser = await User.findOne({
      where: {
        id
      }
    });

    let updatedUser = await User.update(
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

    if (file) {
      uploadPhotoToRackspace(file).then(
        async fileUrl => {
          updatedUser = await updateUserProfilePicture(id, fileUrl);
          if (!!updatedUser.error) {
            return res.status(500).send('Can not to update profile picture.')
          }
          return res.json({
            message: 'User profile updated!',
            updatedUser,
            updatedAccount,
            fileUrl
          });
        },
        error => {
          return res.status(500).send(error);
        }
      )
    } else {
      res.json({
        message: 'User profile updated!',
        updatedUser,
        updatedAccount
      });
    }
  } catch (error) {
    return res.status(500).send(error);
  }
}

async function updateUserProfilePicture(userId, fileUrl) {
  try {
    const updatedUser = await User.update(
      { filename: fileUrl },
      { where: { id: userId }}
    );
    return updatedUser;
  } catch (error) {
    console.error(error);
    return { error };
  }
}


module.exports = {
  updateUserProfile,
  updateUserProfilePicture,
};
