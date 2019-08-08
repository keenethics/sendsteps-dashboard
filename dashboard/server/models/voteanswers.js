/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('voteanswers', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    voteId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'votes',
        key: 'id'
      }
    },
    answer: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    answerCode: {
      type: DataTypes.CHAR(2),
      allowNull: false
    },
    correctAnswer: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: 'voteanswers'
  });
};
