/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('translation_keys', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    text: {
      type: DataTypes.STRING(2040),
      allowNull: false
    }
  }, {
    tableName: 'translation_keys'
  });
};
