/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('userslog', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    createdBy: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    ownerAccountId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    userType: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    payCode: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'userslog'
  });
};
