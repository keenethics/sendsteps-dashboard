/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('survey_question_option', {
    survey_question_option_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    option: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    survey_question_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'survey_question',
        key: 'survey_question_id'
      }
    }
  }, {
    tableName: 'survey_question_option'
  });
};
