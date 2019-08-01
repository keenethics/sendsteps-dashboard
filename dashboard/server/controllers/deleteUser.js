const models = require('../models');

const { user: User, sessions: Session } = models;

function getCurrentDate() {
  let d = new Date(),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}

function makeMessageDeleted(message, appendStr) {
  const columnLength = 32;
  const finalMessage = message + appendStr;

  if (finalMessage.length > columnLength) {
    return message.slice(0, columnLength - appendStr.length) + appendStr;
  }

  return finalMessage;
}

async function deleteUser(req, res) {
  const { id } = req.body;
  const currentDate = getCurrentDate();
  const deleteStringTemplate = '-old-' + currentDate;
  // From jwt-express
  const email = req.user.email;

  try {
    const userToDelete = await User.findOne({
      where: {
        id,
        email
      }
    });

    if (!userToDelete) {
      return res.status(404).json({ error: 'User not found' });
    }

    const sessionToDelete = await Session.findOne({
      where: {
        userId: id
      }
    });

    await User.update(
      {
        isDeleted: '1',
        email: userToDelete.email + deleteStringTemplate,
        dateDeleted: currentDate
      },
      {
        where: { id }
      }
    );

    await Session.update(
      {
        internetKeyword: makeMessageDeleted(sessionToDelete.internetKeyword, deleteStringTemplate),
        textMessagingKeyword: makeMessageDeleted(
          sessionToDelete.textMessagingKeyword,
          deleteStringTemplate
        )
      },
      {
        where: {
          userId: id
        }
      }
    );

    return res.json({
      message: 'User was deleted!'
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
}

module.exports = {
  deleteUser
};
