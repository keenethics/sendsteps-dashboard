/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('sessionresults', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    sessionId: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    resultsFilePath: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'sessionresults'
  });
};
