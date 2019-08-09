/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('savedresults', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    sessionId: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    quizMode: {
      type: DataTypes.INTEGER(3).UNSIGNED,
      allowNull: true
    }
  }, {
    tableName: 'savedresults'
  });
};
