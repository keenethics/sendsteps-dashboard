/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('survey_response_status', {
    survey_response_status_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    survey_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'survey',
        key: 'survey_id'
      }
    },
    php_session_id: {
      type: "BINARY(40)",
      allowNull: false
    },
    status: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      defaultValue: '0'
    },
    submitted_datetime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'survey_response_status'
  });
};
