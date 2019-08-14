const models = require('../models');

const { user: User } = models;

async function takeTour(req, res) {
  const { id } = req.body;
  const { email } = req.user;

  if (!id) {
    return res.status(400).json({ message: 'ID must be specified!' });
  }

  try {
    const foundUser = await User.findOne({
      where: {
        id,
        email
      }
    });

    if (!foundUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    const updatedUser = await User.update(
      { isGuidedTourTake: 1 },
      {
        where: { id, email }
      }
    );

    return res.json({ message: 'Guided tour was taken!' });
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
}

async function check(req, res) {
  const { id } = req.body;
  const { email } = req.user;

  if (!id) {
    return res.status(400).json({ message: 'ID must be specified!' });
  }

  try {
    const searchedUser = await User.findOne({
      where: { id, email }
    });

    if (!searchedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json({ isGuidedTourTake: searchedUser.isGuidedTourTake });
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
}

module.exports = { takeTour, check };
