/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('apiaccounts', {
    id: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      primaryKey: true
    },
    account: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    application: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    apikey: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    role: {
      type: DataTypes.STRING(10),
      allowNull: true
    }
  }, {
    tableName: 'apiaccounts'
  });
};
