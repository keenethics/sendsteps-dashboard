/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('websitesettings', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    url: {
      type: DataTypes.STRING(256),
      allowNull: false,
      unique: true
    },
    productName: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    websiteLink: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    internalName: {
      type: DataTypes.STRING(256),
      allowNull: false
    }
  }, {
    tableName: 'websitesettings'
  });
};
