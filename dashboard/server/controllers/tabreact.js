const Sequelize = require('sequelize');

const {
  sessions: Sessions,
  tab_settings: tabSettings,
  tab_status: tabStatus,
} = require('../models');

async function getData(req, res) {
  if (!req.session || !req.user) return res.status(400).json({
    error: 'Bad request. No such session or user'
  });

  const { session, user } = req;

  try {
    const modelTabSettings = await tabSettings.findOne({
      where: {
        session_id: session.id,
      },
    });

    res.json({
      modelTabSettings,
    });
  } catch (error) {
    return res.status(500).send(error);
  }
}

module.exports = {
  getData,
};
