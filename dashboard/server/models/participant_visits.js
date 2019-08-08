/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('participant_visits', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    identificationHash: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    visitedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    sessionRunId: {
      type: DataTypes.INTEGER(10),
      allowNull: true
    },
    sessionId: {
      type: DataTypes.INTEGER(10),
      allowNull: true
    },
    participantId: {
      type: DataTypes.INTEGER(10),
      allowNull: true
    },
    isActive: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '1'
    },
    presentationId: {
      type: DataTypes.INTEGER(10),
      allowNull: true
    }
  }, {
    tableName: 'participant_visits'
  });
};
