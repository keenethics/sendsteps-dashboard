/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('countries', {
    isoCode: {
      type: DataTypes.CHAR(3),
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    webSelectable: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    },
    callPrefix: {
      type: DataTypes.STRING(10),
      allowNull: true
    }
  }, {
    tableName: 'countries'
  });
};
