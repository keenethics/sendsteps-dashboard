/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('savedresultsparticipants', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    savedResultsId: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(127),
      allowNull: false
    }
  }, {
    tableName: 'savedresultsparticipants'
  });
};
