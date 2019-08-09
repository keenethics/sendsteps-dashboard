/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('presentations', {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    sessionRunId: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    active: {
      type: DataTypes.INTEGER(1).UNSIGNED,
      allowNull: false,
      defaultValue: '1'
    },
    isDeleted: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: 'presentations'
  });
};
