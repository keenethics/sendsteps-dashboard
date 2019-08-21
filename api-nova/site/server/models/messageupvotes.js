/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('messageupvotes', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    participantId: {
      type: DataTypes.INTEGER(10),
      allowNull: false
    },
    messageId: {
      type: DataTypes.INTEGER(10),
      allowNull: false
    },
    sessionId: {
      type: DataTypes.INTEGER(10),
      allowNull: false
    },
    isDeleted: {
      type: DataTypes.INTEGER(1),
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: '0000-00-00 00:00:00'
    }
  }, {
    tableName: 'messageupvotes'
  });
};
