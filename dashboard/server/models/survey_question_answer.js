/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('survey_question_answer', {
    survey_question_answer_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    survey_question_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'survey_question',
        key: 'survey_question_id'
      }
    },
    answer: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    session_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'sessions',
        key: 'id'
      }
    },
    answered_date_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    source: {
      type: "BINARY(40)",
      allowNull: false
    }
  }, {
    tableName: 'survey_question_answer'
  });
};
