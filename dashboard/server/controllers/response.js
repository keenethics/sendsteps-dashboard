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

module.exports = { getResponseSettings };
