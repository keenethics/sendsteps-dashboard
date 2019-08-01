const jwt = require('jsonwebtoken');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const destructurizationHelper = require('../helpers/destructurizationHelper');
const uploadPhotoToRackspace = require('../middlewares/rackspaceUploader');
const { user: User, accounts: Account } = require('../models');
const { isValidEmail } = require('../helpers/validationHelpers');

function validateData(data) {
  const { firstName, lastName, email } = data;
  const errors = {};

  if (firstName.length === 0 || firstName.length > 25) {
    errors.firstName = 'firstName must be from 1 to 25 characters long';
  }

  if (lastName.length === 0 || lastName.length > 25) {
    errors.lastName = 'lastName must be from 1 to 25 characters long';
  }

  if (!isValidEmail(email)) {
    errors.email = 'email is invalid';
  }

  return errors;
}

async function updateUserProfile(req, res) {
  const enteredInfo = req.body;
  const file = req.file;
  const { id, email } = enteredInfo;
  const response = {
    message: 'User profile updated!'
  };

  const errors = validateData(req.body);
  if (Object.keys(errors).length !== 0) {
    return res.status(400).json({
      errors
    });
  }

  try {
    const currentUser = await User.findOne({
      where: {
        id
      }
    });

    if (currentUser.email !== email) {
      // Checking if another user with entered email exists
      const userWithEmail = await User.findOne({
        where: {
          id: {
            [Op.ne]: id
          },
          email
        }
      });

      if (userWithEmail) {
        return res.status(409).json({ error: 'User with this email already exist' });
      } else {
        // Generating JWT token
        const token = jwt.sign({ email }, process.env.JWT_PRIVATE_KEY, {
          algorithm: 'HS256'
        });
        response.token = token;
      }
    }

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

    if (file) {
      uploadPhotoToRackspace(file).then(
        async fileUrl => {
          const updated = await updateUserProfilePicture(id, fileUrl);
          if (!!updated.error) {
            return res.status(500).send('Can not to update profile picture.')
          }
          return res.json({ ...response, fileUrl });
        },
        error => {
          return res.status(500).send(error);
        }
      )
    } else {
      res.json(response);
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
