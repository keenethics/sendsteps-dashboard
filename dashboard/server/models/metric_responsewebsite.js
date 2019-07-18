/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('metric_responsewebsite', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    participant_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'participants',
        key: 'id'
      }
    },
    vote_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'votes',
        key: 'id'
      }
    },
    type: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    domain: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'metric_responsewebsite'
  });
};
