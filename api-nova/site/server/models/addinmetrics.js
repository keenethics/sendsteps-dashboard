/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('addinmetrics', {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false
    },
    brand: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    buildDateTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    phpSessionId: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    addinGuid: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    machineGuid: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    ppVersion: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    ppBuild: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    isAddin64bit: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    tableName: 'addinmetrics'
  });
};
