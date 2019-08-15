const {
  user: User,
  sessions: Session
} = require('../models');

User.hasOne(Session);

// This should return identification type and session id
// Should take an userId and email from token
// endpoint for it is POST to /api/identification/getIdentificationType
async function getSessionDataByUserIdAndEmail(req, res) {
  const { id } = req.body;
  const email = req.user.email;
  if (!id || !email) {
    return res.status(400).json({ error: 'ID and email must be specified!' });
  }
  try {
    const sessionData = await User.findOne({
      where: { id, email, isDeleted: 0 },
      include: {
        model: Session,
        where: {
          userId: id,
        },
        attributes: ['id', 'anonymousSources']
      },
      attributes: []
    });
    if (!sessionData) {
      return res.status(400).json({ error: 'Bad request. No such session or user. ' });
    }

    res.json(sessionData.session);
  } catch (error) {
    return res.status(500).send(error);
  }
}


// This should set identification type
// Should take an userId and sessionId and isAnonymous
// endpoint for it is POST to /api/identification/setIdentificationType
async function setIdentificationType(req, res) {
  const { userId, sessionId, isAnonymous } = req.body;
  if (!userId || !sessionId) {
    return res.status(400).json({ error: 'ID and session id must be specified!' });
  }

  try {
    const sessionUpdate = await Session.update(
      { anonymousSources: Number(!!isAnonymous) },
      {
        where: {
          id: sessionId,
          userId
        }
      }
    );
    if (!sessionUpdate[0]) {
      res.status(400).json({ error: 'Bad request. Nothing to update!' })
    }

    res.json({ success: 'Successfully updated.' });
  } catch (error) {
    return res.status(500).send(error);
  }
}

module.exports = {
  getSessionDataByUserIdAndEmail,
  setIdentificationType
};
