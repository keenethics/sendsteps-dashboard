/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('sessionstarters', {
    sessionId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    addInVersion: {
      type: DataTypes.STRING(16),
      allowNull: false,
      defaultValue: ''
    },
    machineUid: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    addinUid: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    tableName: 'sessionstarters'
  });
};
