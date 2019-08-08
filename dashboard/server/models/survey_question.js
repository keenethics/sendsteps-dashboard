/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('survey_question', {
    survey_question_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    question: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    survey_question_type_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'survey_question_type',
        key: 'survey_question_type_id'
      }
    },
    session_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'sessions',
        key: 'id'
      }
    },
    created_date_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    survey_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'survey',
        key: 'survey_id'
      }
    },
    status: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    },
    is_required: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '1'
    },
    order: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: 'survey_question'
  });
};
