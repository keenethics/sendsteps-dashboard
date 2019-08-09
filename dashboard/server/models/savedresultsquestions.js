/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('savedresultsquestions', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    savedResultsId: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false
    },
    index: {
      type: DataTypes.INTEGER(5).UNSIGNED,
      allowNull: false
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    type: {
      type: DataTypes.INTEGER(3).UNSIGNED,
      allowNull: false
    }
  }, {
    tableName: 'savedresultsquestions'
  });
};
