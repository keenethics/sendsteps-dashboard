/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('licenceinfocontact', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    colleague_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    departmentName: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    colleague_email: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    contacted_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'licenceinfocontact'
  });
};
