/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('participantsinfo', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    participantId: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false
    },
    sessionRunId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    source: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    participantInfoFieldId: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false
    },
    value: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    updateTime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'participantsinfo'
  });
};
