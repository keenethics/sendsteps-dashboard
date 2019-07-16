
module.exports = (sequelize, DataTypes) => {
  const TestUser = sequelize.define('TestUser', {
    firstName: DataTypes.STRING,
    // createdAt: DataTypes.DATE,
    // updatedAt: DataTypes.DATE,
    // email: DataTypes.STRING,
    // password: DataTypes.STRING,
    // refreshToken: DataTypes.STRING,
  }, {});

  return TestUser;
};
