/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('livemessageroundmessages', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    source: {
      type: "BINARY(40)",
      allowNull: false
    },
    participantId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    destination: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    text: {
      type: DataTypes.STRING(256),
      allowNull: true
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: '0000-00-00 00:00:00'
    },
    connection: {
      type: DataTypes.STRING(32),
      allowNull: false,
      defaultValue: ''
    },
    sessionId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0',
      references: {
        model: 'sessions',
        key: 'id'
      }
    },
    messageRoundId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'messagerounds',
        key: 'id'
      }
    },
    status: {
      type: DataTypes.ENUM('unread','read','edited','showing','shown','removed','copied'),
      allowNull: false,
      defaultValue: 'unread'
    },
    starred: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    },
    groupId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'livemessageroundmessagegroups',
        key: 'id'
      }
    },
    commentTitle: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'livemessageroundmessages'
  });
};
