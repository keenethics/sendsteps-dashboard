/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('livevotemessages', {
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
      allowNull: false
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
    voteId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'votes',
        key: 'id'
      }
    },
    edited: {
      type: DataTypes.INTEGER(6),
      allowNull: true,
      defaultValue: '0'
    }
  }, {
    tableName: 'livevotemessages'
  });
};
