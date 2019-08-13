const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { addinsettings: Addinsetting, sessions: Session } = require('../models');

async function getDownloadAddInUrl(req, res) {
  const defaultUrl = 'https://update.sendsteps.com/Sendsteps.setup.exe';
  const originUrl = req.protocol + '://' + req.get('host');
  const userId = req.body.userId;

  if (!userId) {
    return res.status(400).json({ message: 'userId should be presented' });
  }

  const foundSession = await Session.findOne({
    where: {
      userId
    }
  });

  const addinsetting = await Addinsetting.findOne({
    where: {
      [Op.or]: [{ dashboardUrl: originUrl }, { id: foundSession.pluginId }]
    }
  });

  const downloadUrl = addinsetting
    ? `https://update.sendsteps.com/${addinsetting.name}.setup.exe`
    : defaultUrl;

  res.json({ url: downloadUrl });
}

module.exports = getDownloadAddInUrl;
