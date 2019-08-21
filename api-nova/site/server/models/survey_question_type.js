/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('survey_question_type', {
    survey_question_type_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    question_type: {
      type: DataTypes.STRING(60),
      allowNull: false
    }
  }, {
    tableName: 'survey_question_type'
  });
};
