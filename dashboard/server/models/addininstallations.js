/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('addininstallations', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    date: {
      type: DataTypes.DATE,
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
    addinBrand: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    addinBuildDate: {
      type: DataTypes.DATE,
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
      type: DataTypes.INTEGER(4),
      allowNull: false
    },
    windowsMajor: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    windowMinor: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    windowsBuild: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    isWow64Process: {
      type: DataTypes.INTEGER(4),
      allowNull: false
    }
  }, {
    tableName: 'addininstallations'
  });
};
