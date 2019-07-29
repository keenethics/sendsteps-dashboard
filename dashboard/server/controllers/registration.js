const models = require('../models');
const jwt = require('jsonwebtoken');
const userRoles = require('../helpers/userRoles');
const fetch = require('node-fetch');
const uniqid = require('uniqid');
const destructurizationHelper = require('../helpers/destructurizationHelper');
const {
  DEFAULT_UNKNOWN,
  DEFAULT_USERS,
  DEFAULT_AUDIENCE_SIZE,
  DEFAULT_LICENCE_TYPE,
  DEFAULT_TIMEZONE,
  DEFAULT_PAYMENT_AMOUNT,
  DEFAULT_PHONE_NUMBER
} = require('../helpers/accountsConstants');
const { DEFAULT_ORIGIN } = require('../helpers/usersConstants');
const {
  DEFAULT_TEXT_MESSAGING_SELECTED,
  DEFAULT_SESSION_TYPE
} = require('../helpers/sessionsConstants');
const { isValidEmail, isValidPassword } = require('../helpers/validationHelpers');
const { DEFAULT_USER_TYPE } = require('../helpers/userslogConstants');
// for using .env variables
require('dotenv-safe').config();

const IP_PARSE_URL = process.env.IP_PARSE_URL;
const IP_TOKEN = process.env.IP_TOKEN;

const {
  user: User,
  accounts: Account,
  sessions: Session,
  phonenumbers: PhoneNumber,
  userslog: UserLog
} = models;

function getResponseCodeBase(email) {
  const defaultCode = 'sendsteps';

  const baseCode = email.match(/(?<=@)[^.]+(?=\.)/)[0];

  if (['hotmail', 'gmail', 'yahoo'].includes(baseCode)) {
    return defaultCode;
  }

  return baseCode;
}

async function getData(url) {
  const empty = {};

  try {
    const response = await fetch(url);
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(error);
  }

  return empty;
}

function generateMessageKeyword(responseCodeBase) {
  let generatedMessage = '';
  if (responseCodeBase) {
    generatedMessage = 'free';
  }

  generatedMessage = responseCodeBase.slice(0, 20) + Math.floor(Math.random() * 10000000000);

  return generatedMessage;
}

function validateData(data) {
  const {
    firstName,
    lastName,
    email,
    password,
    users,
    audienceSize,
    licenceType,
    timezone,
    address,
    paymentAmount,
    sendstepsEducation
  } = data;
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

  if (!isValidPassword(password)) {
    errors.password = 'password must be from 6 to 40 characters long';
  }

  if (users && (users < 0 || !Number.isInteger(users))) {
    errors.users = 'users must be a positive integer';
  }

  if (audienceSize && (audienceSize < 0 || !Number.isInteger(audienceSize))) {
    errors.audienceSize = 'audienceSize must be a positive integer';
  }

  if (licenceType && licenceType.length > 75) {
    errors.licenceType = 'licenceType must be shorter than 75 characters';
  }

  if (timezone && timezone.length > 75) {
    errors.timezone = 'timezone must be shorter than 75 characters';
  }

  if (address && address.length > 75) {
    errors.address = 'address must be shorter than 75 characters';
  }

  if (paymentAmount && (paymentAmount < 0 || !Number.isInteger(paymentAmount))) {
    errors.paymentAmount = 'paymentAmount must be a positive integer';
  }

  if (sendstepsEducation && (sendstepsEducation !== 1 && sendstepsEducation !== 0)) {
    errors.sendstepsEducation = 'sendstepsEducation must be 1 or 0';
  }

  return errors;
}

async function registerUser(req, res) {
  const {
    firstName,
    lastName,
    email,
    password,
    users,
    audienceSize,
    licenceType,
    timezone,
    address,
    paymentAmount,
    sendstepsEducation
  } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({
      error: 'firstName, lastName, email and password must be specified'
    });
  }

  const errors = validateData(req.body);
  if (Object.keys(errors).length !== 0) {
    return res.status(400).json({
      errors
    });
  }

  try {
    const checkedUser = await User.findOne({
      where: { email }
    });

    if (checkedUser) {
      return res.status(409).json({ error: 'Email is already in use.' });
    }

    const date = new Date();
    const dateAfterYear = new Date(date.getFullYear() + 1, date.getMonth(), date.getDay());

    // Obtaining user location data
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    let userLocation = {};

    userLocation = await getData(`${IP_PARSE_URL}${ip}?access_key=${IP_TOKEN}`);

    // Finding phone number record using client's country code
    const phoneNumber = await PhoneNumber.findOne({
      where: {
        countryIsoCode: userLocation.country_code || 'NL'
      }
    });

    // Creating records
    const createdUser = await User.create({
      firstName,
      lastName,
      email,
      password,
      role: userRoles.ADMIN,
      auth_key: '',
      accountId: 0,
      ...destructurizationHelper(req.body, 'language', 'os', 'browser'),
      origin: DEFAULT_ORIGIN,
      emailUnconfirmed: '',
      isDeleted: 0,
      createdDate: date.toLocaleString(),
      lastUsedDate: date.toLocaleString(),
      created_at: Math.round(Date.now() / 1000),
      updated_at: Math.round(Date.now() / 1000),
      moderatorSharingToken: ''
    });

    const createdAccount = await Account.create({
      users: users || DEFAULT_USERS,
      audienceSize: DEFAULT_AUDIENCE_SIZE,
      licenceType: licenceType || DEFAULT_LICENCE_TYPE,
      startDate: date.toLocaleString(),
      endDate: dateAfterYear.toLocaleString(),
      timezone: timezone || DEFAULT_TIMEZONE,
      pluginId: 1,
      address: address || '',
      city: userLocation.city || DEFAULT_UNKNOWN,
      country: userLocation.country_name || DEFAULT_UNKNOWN,
      paymentAmount: paymentAmount || DEFAULT_PAYMENT_AMOUNT,
      responseCodeBase: getResponseCodeBase(email),
      sendstepsEducation: sendstepsEducation ? 1 : 0,
      university: '',
      postalCode: '',
      phonenumber: DEFAULT_PHONE_NUMBER,
      paymentMethod: DEFAULT_UNKNOWN,
      accountOwner: createdUser.id
    });

    User.update(
      {
        accountId: createdAccount.id
      },
      {
        where: {
          id: createdAccount.accountOwner
        }
      }
    );

    const generatedMessage = generateMessageKeyword(createdAccount.responseCodeBase);

    const createdSession = await Session.create({
      accountId: createdAccount.id,
      loginCode: uniqid().slice(8),
      userId: createdUser.id,
      startTime: date.toLocaleString(),
      endTime: dateAfterYear.toLocaleString(),
      timezone: timezone || DEFAULT_TIMEZONE,
      textMessagingSelected: DEFAULT_TEXT_MESSAGING_SELECTED,
      audienceSize: audienceSize || DEFAULT_AUDIENCE_SIZE,
      phoneNumberId: phoneNumber.id,
      internetKeyword: generatedMessage,
      textMessagingKeyword: generatedMessage,
      internetSelected: 1,
      anonymousSources: 1,
      twitterSelected: 0,
      autoApprove: 1,
      pluginId: 1,
      type: DEFAULT_SESSION_TYPE,
      name: '',
      loginToken: '',
      autoLogoutTime: date,
      moderatorSharingToken: ''
    });

    const createdUserLog = await UserLog.create({
      ownerAccountId: createdAccount.id,
      createdBy: createdUser.id,
      userType: DEFAULT_USER_TYPE,
      userId: createdUser.id,
      createdAt: date.toLocaleString()
    });

    // Generating JWT token
    const token = jwt.sign({ email }, process.env.JWT_PRIVATE_KEY, {
      algorithm: 'HS256'
    });

    return res.json({
      jwt: token,
      userId: createdUser.id,
      userType: createdUser.role
    });
  } catch (err) {
    return res.status(500).send(err);
  }
}

module.exports = {
  registerUser
};
