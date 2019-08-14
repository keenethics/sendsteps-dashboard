const index = require('../index.test');
const { models } = index;

const { user: User } = models;

const testUser = {
  email: 'test@gmail.com',
  password: 'password',
  firstName: 'Test',
  lastName: 'Tester'
};

const createTestUser = async (props) => {
  const date = new Date();
  const dateAfterYear = new Date(date.getFullYear() + 1, date.getMonth(), date.getDay());

  const createdUser = await User.create({
    ...testUser,
    role: 'admin',
    auth_key: '',
    accountId: 0,
    origin: 'test',
    emailUnconfirmed: '',
    isDeleted: 0,
    createdDate: date.toLocaleString(),
    lastUsedDate: date.toLocaleString(),
    created_at: Math.round(Date.now() / 1000),
    updated_at: Math.round(Date.now() / 1000),
    moderatorSharingToken: '',
    isGuidedTourTake: 0,
    ...props,
  });
  return createdUser;
}

module.exports = {
  createTestUser,
  testUser,
};
