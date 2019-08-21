/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('userpasswordresetrequests', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    resetToken: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    tableName: 'userpasswordresetrequests'
  });
};
