/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('savedresultsanswers', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    savedResultsId: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false
    },
    savedQuestionId: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false
    },
    savedParticipantId: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false
    },
    code: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    text: {
      type: DataTypes.STRING(256),
      allowNull: false
    }
  }, {
    tableName: 'savedresultsanswers'
  });
};
