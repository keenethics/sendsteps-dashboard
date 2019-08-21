const models = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { trimObject } = require('../helpers/validationHelpers');

const {
  sessions: Session,
  phonenumbers: PhoneNumber,
  countries: Country,
  response_websites: ResponseSite
} = models;

// used for validation of updateResponseSettings req data
async function validateData(settings) {
  const {
    userId,
    internetaddressoverwrite,
    textmessagingselected,
    phonenumberId,
    textmessagingkeyword
  } = settings;
  const errors = {};

  if (!userId) {
    errors.userId = 'userId should be specified';
  }

  if (internetaddressoverwrite === undefined) {
    errors.internetaddressoverwrite = 'internetaddressoverwrite should be specified';
  }

  if (textmessagingselected === undefined) {
    errors.textmessagingselected = 'textmessagingselected should be specified';
  }

  if (textmessagingselected) {
    if (!phonenumberId) {
      errors.phonenumberId = 'phonenumberId should be specified';
    } else {
      const phoneNumbers = await PhoneNumber.findAll({ where: { id: phonenumberId } });

      if (phoneNumbers.length === 0) {
        errors.phonenumberId = 'phonenumberId is wrong, no phone numbers were found';
      }
    }
  }

  if (internetaddressoverwrite) {
    const sessions = await Session.findAll({
      where: {
        internetKeyword: textmessagingkeyword,
        textMessagingKeyword: textmessagingkeyword,
        userId: { [Op.ne]: userId }
      }
    });

    if (sessions.length !== 0) {
      errors.textmessagingselected = 'textmessagingkeyword is not unique';
    }
  }

  return Object.entries(errors).length && errors;
}

// This should obtain response settings
// Should take id of an user
// endpoint for it is POST to /api/response/settings
async function getResponseSettings(req, res) {
  const { id } = req.body;
  const content = {};

  if (!id) {
    return res.status(400).json({ message: 'id is required' });
  }

  try {
    const foundSession = req.session;
    console.log('foundSession', foundSession)

    content.textmessagingkeyword = foundSession.textMessagingKeyword;
    content.internetselected = foundSession.internetSelected;
    content.textmessagingselected = foundSession.textMessagingSelected;
    content.internetaddressoverwrite = foundSession.internetAddressOverwrite;
    content.phonenumberId = foundSession.phoneNumberId;

    const foundPhoneNumber = await PhoneNumber.findOne({
      where: { id: foundSession.phoneNumberId }
    });

    content.countriesList = await Country.findAll({
      attributes: ['isoCode', 'name'],
      include: [
        {
          attributes: [],
          model: PhoneNumber,
          where: { isDeleted: { [Op.ne]: 1 } }
        }
      ]
    });

    content.phonenumberCountryisocode = foundPhoneNumber.countryIsoCode;
    content.phonenumberForeignerCompatible = foundPhoneNumber.foreignerCompatible;

    content.responseSitesList = await ResponseSite.findAll({
      attributes: ['id', 'domain'],
      where: { isDeleted: 0 }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send('Internal Server Error');
  }

  return res.json({ content });
}

// This should update response settings
// Should take an object that stores all response settings:
// ( userId, internetaddressoverwrite, textmessagingselected, phonenumberId, textmessagingkeyword )
// endpoint for it is POST to /api/response/update
async function updateResponseSettings(req, res) {
  const { settings } = req.body;

  if (!settings) {
    return res.status(400).json({ message: 'settings is required' });
  }
  trimObject(settings);

  const errors = await validateData(settings);
  if (Object.keys(errors).length !== 0) {
    return res.status(400).json({
      errors
    });
  }

  const {
    userId,
    internetaddressoverwrite,
    internetselected,
    phonenumberId,
    textmessagingkeyword,
    textmessagingselected
  } = settings;

  try {
    // data validation

    const result = await Session.update(
      {
        internetAddressOverwrite: internetaddressoverwrite,
        internetSelected: Number(!!internetselected),
        internetKeyword: textmessagingkeyword,
        textMessagingKeyword: textmessagingkeyword,
        textMessagingSelected: Number(!!textmessagingselected),
        phoneNumberId: phonenumberId
      },
      { where: { userId } }
    );
  } catch (error) {
    return res.status(500).send('Internal Server Error');
  }

  return res.json({ message: 'Response settings was updated' });
}

// This should update response settings
// Should take an country iso code and
// return info about its phone numbers
// endpoint for it is POST to /api/response/number
async function getNumberByIsoCode(req, res, next) {
  const isoCode = req.body.isoCode;
  const defaultIsoCode = 'NL';
  let result;

  if (!isoCode) {
    return res.status(400).json({ message: 'isoCode is required' });
  }

  try {
    if (isoCode === '' || isoCode === '--') {
      result = await PhoneNumber.findAll({
        attributes: ['id', 'phonenumber', 'displayText', 'countryIsoCode', 'foreignerCompatible'],
        where: {
          foreignerCompatible: { [Op.in]: [2] },
          countryIsoCode: defaultIsoCode,
          keywordAvailability: 'dedicated'
        }
      });
    } else {
      result = await PhoneNumber.findAll({
        attributes: ['id', 'phonenumber', 'displayText', 'countryIsoCode', 'foreignerCompatible'],
        where: {
          foreignerCompatible: { [Op.in]: [1, 2] },
          countryIsoCode: isoCode,
          keywordAvailability: 'dedicated'
        }
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send('Internal Server Error');
  }

  return res.json({ result });
}

// This function checks the uniqueness of internetKeyword & textMessagingKeyword
// Should take an keyword and userId
// endpoint for it is POST to /api/response/checkCode
async function checkResponseCode(req, res, next) {
  const { keyword, userId } = req.body;
  let sessions = [];

  if (keyword === undefined || userId === undefined) {
    return res.status(400).json({ message: 'keyword and userId is required' });
  }

  try {
    sessions = await Session.findAll({
      where: {
        internetKeyword: keyword,
        textMessagingKeyword: keyword,
        userId: { [Op.ne]: userId }
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send('Internal Server Error');
  }

  return res.json({ result: sessions.length === 0 });
}

module.exports = {
  getResponseSettings,
  updateResponseSettings,
  getNumberByIsoCode,
  checkResponseCode
};
