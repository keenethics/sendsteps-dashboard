const {
  user: User,
  sessions: Session,
  participantinfofields: Participantinfofield,
  participantinfofieldsoption: Participantinfofieldsoption
} = require('../models');
const { getFormedParticipantOption } = require('../helpers/participantInfoFieldsHelper');


User.hasOne(Session);
Participantinfofield.hasMany(Participantinfofieldsoption, { foreignKey: 'participantinfofieldsId', as: 'options' });


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

// This should get all identification Questions with it options
// Should take an sessionId
// endpoint for it is POST to /api/identification/getQuestions
async function getQuestions(req, res) {
  const { sessionId } = req.body;
  if (!sessionId) {
    return res.status(400).json({ error: 'Session id must be specified!' });
  }

  try {
    const indetificationQuestion = await Participantinfofield.findAll({
      where: { sessionId, deleted: 0 },
      include: {
        model: Participantinfofieldsoption, as: 'options',
        attributes: ['allowedValues'],
        raw : true,
      },
    }).then(indetification => indetification.map(
      el => (
        {
          ...el.dataValues,
          options: el.options.map(option => option.allowedValues)
        }
      )
    ));

    res.json(indetificationQuestion);
  } catch (error) {
    return res.status(500).send(error);
  }
}

// This should create Participantinfofield question
// Should take an sessionId and question
// endpoint for it is POST to /api/identification/createIdentificationQuestion
async function createIdentificationQuestion(req, res) {
  const { sessionId, question } = req.body;
  const { id: questionId, title, fieldIndex, type, isRequired, isIdentifier, options = {} } = question;
  if (!sessionId || !question) {
    return res.status(400).json({ error: 'Session id and question must be specified!' });
  }

  try {
    let createdQuestion;
    if (!questionId) {
      createdQuestion = await Participantinfofield.create({
        title,
        type,
        sessionId,
        fieldIndex,
        isRequired: Number(!!isRequired),
        isIdentifier: Number(!!isIdentifier)
      });
    } else {
      let updatedQuestion = await Participantinfofield.update(
        {
          title,
          type,
          fieldIndex,
          isRequired: Number(!!isRequired),
        },
        { where: { id: questionId }}
      );

      await Participantinfofieldsoption.destroy({ where: { participantinfofieldsId: questionId }});
    }

    const participantinfofieldsId = createdQuestion && createdQuestion.id || questionId;
    if (participantinfofieldsId) {
      const participantsOptions = getFormedParticipantOption(participantinfofieldsId, options);
      await Participantinfofieldsoption.bulkCreate(participantsOptions);
    }

    const questions = await Participantinfofield.findAll({ where: { sessionId }});
    res.json(questions);
  } catch (error) {
    return res.status(500).send(error);
  }
}


module.exports = {
  getSessionDataByUserIdAndEmail,
  setIdentificationType,
  getQuestions,
  createIdentificationQuestion,
};
