const models = require('../models');

const { response_websites: ResponseWebsite } = models;

async function getSites(req, res) {
  const websites = await ResponseWebsite.findAll({
    attributes: ['id', 'domain'],
    where: {
      isDeleted: 0
    },
    order: [['domain']]
  });

  res.json({ content: websites });
}

async function getSiteById(req, res) {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: 'id is required' });
  }

  const website = await ResponseWebsite.findOne({
    where: {
      isDeleted: 0,
      id
    }
  });

  res.json({ content: website });
}

module.exports = { getSites, getSiteById };
