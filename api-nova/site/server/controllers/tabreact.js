const Sequelize = require('sequelize');

const { body, validationResult } = require('express-validator');

const {
  sessions: Sessions,
  tab_settings: tabSettings,
  tab_status: tabStatus,
} = require('../models');

async function validateUpdate(req, res, next) {
  await body('twitter_status').isInt({ min: 0, max: 1 }).run(req);
  await body('mail_status').isInt({ min: 0, max: 1 }).run(req);
  await body('edit_answers').isInt({ min: 0, max: 1 }).run(req);

  const errors = validationResult(req);

  if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() });

  next();
}

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

async function setData(req, res) {
  if (!req.session || !req.user || !req.body) return res.status(400).json({
    error: 'Bad request. No such session, user or body',
  });

  const {
    twitterfeed_hashtags,
    twitter_status,
    twitter_text,
    mail_status,
    mail_text,
    edit_answers,
  } = req.body;

  const { session, user } = req;

  try {
    const modelTabSettings = await tabSettings.update(
    {
      twitterfeed_hashtags,
      twitter_status,
      twitter_text,
      mail_status,
      mail_text,
      edit_answers,
    },
    {
      where: {
        session_id: session.id,
      },
    });

    return res.sendStatus(200);
  } catch (error) {
    return res.status(500).send(error);
  }
}

module.exports = {
  validateUpdate,
  getData,
  setData,
};
