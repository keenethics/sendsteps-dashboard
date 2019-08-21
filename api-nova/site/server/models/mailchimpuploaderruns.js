/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('mailchimpuploaderruns', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    lastPoweredById: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    tableName: 'mailchimpuploaderruns'
  });
};
