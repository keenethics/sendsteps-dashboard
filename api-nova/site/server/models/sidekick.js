/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('sidekick', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    messageId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    messageRoundId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    warning: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: 'sidekick'
  });
};
