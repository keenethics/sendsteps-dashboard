const jwt = require('jsonwebtoken');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const destructurizationHelper = require('../helpers/destructurizationHelper');
const { uploadPhotoToRackspace, deleteTempFile } = require('../middlewares/rackspaceUploader');
const { user: User, accounts: Account } = require('../models');
const {
  isValidEmail,
  isValidPhoneNumber,
  isText,
  trimObject
} = require('../helpers/validationHelpers');

function validateData(data) {
  const {
    firstName,
    lastName,
    email,
    phonenumber,
    postalCode,
    departmentName,
    language,
    country,
    city,
    address,
    university
  } = data;
  const errors = {};

  if (firstName.length === 0 || firstName.length > 25) {
    errors.firstName = 'first name must be from 1 to 25 characters long';
  } else if (!isText(firstName)) {
    errors.firstName = 'first name should be valid';
  }

  if (lastName.length === 0 || lastName.length > 25) {
    errors.lastName = 'last name must be from 1 to 25 characters long';
  } else if (!isText(lastName)) {
    errors.lastName = 'last name should be valid';
  }

  if (!isValidEmail(email)) {
    errors.email = 'email is invalid';
  }

  if (phonenumber && !isValidPhoneNumber(phonenumber)) {
    errors.phonenumber = 'phone number is invalid';
  }

  if (postalCode && !isText(postalCode)) {
    errors.postalCode = 'postal code should be valid';
  }

  if (departmentName && !isText(departmentName)) {
    errors.departmentName = 'department name should be valid';
  }

  if (language && !isText(language)) {
    errors.language = 'language should be valid';
  }

  if (country && !isText(country)) {
    errors.country = 'country should be valid';
  }

  if (city && !isText(city)) {
    errors.city = 'city should be valid';
  }

  if (address && /[&\(%#\$\^\)@\?\!]/.test(address)) {
    errors.address = 'address should be valid';
  }

  if (university && !isText(university)) {
    errors.university = 'university should be valid';
  }

  return Object.entries(errors).length  && errors;
}

async function updateUserProfile(req, res) {
  trimObject(req.body);

  const enteredInfo = req.body;
  const file = req.file;
  const { id, email } = enteredInfo;
  const response = {
    message: 'User profile updated!'
  };

  const errors = validateData(enteredInfo);
  if (Object.keys(errors).length !== 0) {
    if (file) deleteTempFile(file.path);
    return res.status(400).json({
      errors
    });
  }

  if (errors) return res.status(400).json(errors);

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
        if (file) deleteTempFile(file.path);
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
            return res.status(500).send({ error: 'Can not to update profile picture.' });
          }
          return res.json({ ...response, fileUrl });
        },
        error => {
          return res.status(500).send({ error });
        }
      );
    } else {
      res.json(response);
    }
  } catch (error) {
    if (file) deleteTempFile(file.path);
    return res.status(500).send({ error });
  }
}

async function updateUserProfilePicture(userId, fileUrl) {
  try {
    const updatedUser = await User.update({ filename: fileUrl }, { where: { id: userId } });
    return updatedUser;
  } catch (error) {
    console.error(error);
    return { error };
  }
}

module.exports = {
  updateUserProfile,
  updateUserProfilePicture
};
