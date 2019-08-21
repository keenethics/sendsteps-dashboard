const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const {
  user: User,
  sessions: Session,
  participantinfofields: Participantinfofield,
  participantinfofieldsoption: Participantinfofieldsoption
} = require('../models');
const { getFormedParticipantOption } = require('../helpers/participantInfoFieldsHelper');


// This should return identification type and session id
// endpoint for it is POST to /api/identification/getIdentificationType
async function getSessionData(req, res) {
  const { anonymousSources } = req.sessions;
  res.json({ anonymousSources });
}


// This should set identification type
// Should take an isAnonymous
// endpoint for it is POST to /api/identification/setIdentificationType
async function setIdentificationType(req, res) {
  const { isAnonymous } = req.body;
  const { id: userId } = req.user;
  const { id: sessionId } = req.sessions;

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
// endpoint for it is POST to /api/identification/getQuestions
async function getQuestions(req, res) {
  const { id: sessionId } = req.sessions;

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

// This should create or edit Participantinfofield question
// Should take question
// endpoint for it is POST to /api/identification/createIdentificationQuestion
async function createIdentificationQuestion(req, res) {
  const { question } = req.body;
  if (!question) {
    return res.status(400).json({ error: 'Question must be specified!' });
  }
  if (typeof question !== 'object') {
    return res.status(422).json({ error: 'Bad question type.' })
  }

  const { id: sessionId } = req.sessions;
  const { id: questionId, title, fieldIndex, type, isRequired, isIdentifier, options = {} } = question;

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
        { where: { id: questionId, sessionId }}
      );

      await Participantinfofieldsoption.destroy({ where: { participantinfofieldsId: questionId }});
    }

    const participantinfofieldsId = createdQuestion && createdQuestion.id || questionId;
    if (participantinfofieldsId) {
      const participantsOptions = getFormedParticipantOption(participantinfofieldsId, options);
      await Participantinfofieldsoption.bulkCreate(participantsOptions);
    }

    const questions = await Participantinfofield.findAll({ where: { sessionId, deleted: 0 }});
    res.json(questions);
  } catch (error) {
    return res.status(500).send(error);
  }
}

// This should create Participantinfofield question
// Should take id of question
// endpoint for it is POST to /api/identification/deleteIdentificationQuestion
async function deleteIdentificationQuestion(req, res) {
  const { id } = req.body;
  const { id: sessionId } = req.sessions;
  try {
    await Participantinfofield.update({ deleted: 1 },{ where: { id, sessionId }});
    await Participantinfofieldsoption.destroy({ where: { participantinfofieldsId: id }});

    const questions = await Participantinfofield.findAll({ where: { sessionId, deleted: 0 }});
    res.json(questions);
  } catch (error) {
    return res.status(500).send(error);
  }
}

// This should create Participantinfofield question
// Should take idPositions
// endpoint for it is POST to /api/identification/updateOrder
async function updateOrder(req, res) {
  const { idPositions = [] } = req.body;
  if (!Array.isArray(idPositions) || !idPositions.length) {
    return res.status(400).json({ error: 'Wrong or empty data.' });
  }
  const { id: sessionId } = req.sessions;
  try {
    let questions = await Participantinfofield.findAll({
      where: {
        id: {
          [Op.in]: idPositions
        }
      }
    });

    const sortedQuestions = questions.map((q, index) => {
      let fieldIndex = idPositions.indexOf(q.id);
      if (fieldIndex >= 0) {
        fieldIndex++;
        return { ...q.dataValues, fieldIndex };
      }
    }).filter(Boolean);
    questions = await Participantinfofield.bulkCreate(sortedQuestions, { updateOnDuplicate : ['id', 'fieldIndex'] });

    res.json(questions);
  } catch (error) {
    return res.status(500).send(error);
  }
}


module.exports = {
  getSessionData,
  setIdentificationType,
  getQuestions,
  createIdentificationQuestion,
  deleteIdentificationQuestion,
  updateOrder,
};
