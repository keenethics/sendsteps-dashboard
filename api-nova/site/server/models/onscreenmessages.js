/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('onscreenmessages', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    messageRoundId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'messagerounds',
        key: 'id'
      }
    },
    messageId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'livemessageroundmessages',
        key: 'id'
      }
    },
    position: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    tableName: 'onscreenmessages'
  });
};
