const models = require('../models');

const { user: User } = models;

async function takeTour(req, res) {
  const { id } = req.body;
  const { email } = req.user;

  if (!id) {
    return res.status(400).json({ error: 'ID must be specified!' });
  }

  try {
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
    return res.status(400).json({ error: 'ID must be specified!' });
  }

  try {
    const searchedUser = await User.findOne({
      where: { id, email }
    });

    if (!searchedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json({ isGuidedTourTake: searchedUser.isGuidedTourTake });
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
}

module.exports = { takeTour, check };
