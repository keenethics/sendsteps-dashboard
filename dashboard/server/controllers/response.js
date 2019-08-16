const models = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const {
  sessions: Session,
  phonenumbers: PhoneNumber,
  countries: Country,
  response_websites: ResponseSite
} = models;

async function getResponseSettings(req, res) {
  const { id } = req.body;
  const content = {};

  if (!id) {
    return res.status(400).json({ message: 'id is required' });
  }

  try {
    const foundSession = await Session.findOne({
      where: {
        userId: id
      }
    });

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

  return res.status(200).json({ content });
}

async function updateResponseSettings(req, res) {
  const { settings } = req.body;
  const content = {};

  if (!settings) {
    return res.status(400).json({ message: 'settings is required' });
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
    await Session.update(
      {
        internetAddressOverwrite: internetaddressoverwrite,
        internetSelected: internetselected,
        internetKeyword: textmessagingkeyword,
        textmessagingkeyword,
        textmessagingselected,
        phonenumberId
      },
      { where: { userId } }
    );
  } catch (error) {
    return res.status(500).send('Internal Server Error');
  }

  return res.status(200).json({ message: 'Response settings was updated' });
}

async function getNumberByIsoCode(req, res) {
  const isoCode = req.body.isoCode;
  const defaultIsoCode = 'NL';
  let result;

  if (!isoCode) {
    return res.status(400).json({ message: 'isoCode is required' });
  }

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

  return res.json({ result });
}

module.exports = { getResponseSettings, updateResponseSettings, getNumberByIsoCode };
