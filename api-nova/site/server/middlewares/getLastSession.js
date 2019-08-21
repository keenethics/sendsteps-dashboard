const { user: User, sessions: Session } = require('../models');

async function getLastSession(req, res, next) {
  if (!req || !req.user) return res.status(400).json({ error: 'Something went wrong' });

  const { id, email } = req.user;

  if (!id || !email) return res.status(400).json({ error: 'ID and email must be specified!' });

  try {
    const sessionData = await User.findOne({
      where: {
        id,
        email,
        isDeleted: 0
      },
      include: {
        model: Session,
        where: {
          userId: id
        },
        attributes: [
          'id',
          'anonymousSources',
          'textMessagingKeyword',
          'internetSelected',
          'textMessagingSelected',
          'internetAddressOverwrite',
          'phoneNumberId'
        ]
      },
      order: [['id', 'DESC']],
      attributes: []
    });
    if (!sessionData) {
      return res.status(400).json({ error: 'Bad request. No such session or user. ' });
    }

    req.session = sessionData.session;

    next();
  } catch (error) {
    return res.status(500).send(error);
  }
}

module.exports = getLastSession;
