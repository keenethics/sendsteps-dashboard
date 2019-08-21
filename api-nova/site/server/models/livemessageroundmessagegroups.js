/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('livemessageroundmessagegroups', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    color: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    tableName: 'livemessageroundmessagegroups'
  });
};
