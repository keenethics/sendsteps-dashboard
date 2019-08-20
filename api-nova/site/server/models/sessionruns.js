/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('sessionruns', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    sessionId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'sessions',
        key: 'id'
      }
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: '0000-00-00 00:00:00'
    },
    limited: {
      type: DataTypes.ENUM('notLimited','limitedToVoting','limitedToPosting'),
      allowNull: false,
      defaultValue: 'notLimited'
    },
    automaticallyClosed: {
      type: DataTypes.INTEGER(1).UNSIGNED,
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: 'sessionruns'
  });
};
