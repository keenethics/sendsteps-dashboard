/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('license_reports', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(1023),
      allowNull: false
    },
    domainsIncluded: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    tableName: 'license_reports'
  });
};
