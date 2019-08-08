/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('savedresultsansweroptions', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    savedQuestionId: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false
    },
    code: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    text: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    correctAnswer: {
      type: DataTypes.INTEGER(3).UNSIGNED,
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: 'savedresultsansweroptions'
  });
};
