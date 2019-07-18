/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('migration', {
    version: {
      type: DataTypes.STRING(180),
      allowNull: false,
      primaryKey: true
    },
    apply_time: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'migration'
  });
};
