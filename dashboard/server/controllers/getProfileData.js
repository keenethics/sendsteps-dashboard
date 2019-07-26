const {
  user: User,
  accounts: Account,
  timezones: Timezone,
  countries: Country
} = require('../models');

async function getProfileData(req, res) {
  try {
    const userData = await User.findOne({
      where: {
        email: req.user.email
      }
    });

    const accountData = await Account.findOne({
      where: {
        id: userData.accountId
      }
    });

    const timezoneData = await Timezone.findAll();

    const countriesData = await Country.findAll({
      attributes: ['isoCode', 'name']
    });

    res.json({
      user: userData,
      account: accountData,
      timezones: timezoneData,
      countries: countriesData
    });
  } catch (error) {
    return res.status(500).send(error);
  }
}

module.exports = getProfileData;
