/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('loginattempts', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    IP: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    status: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    },
    lastLogin: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'loginattempts'
  });
};
