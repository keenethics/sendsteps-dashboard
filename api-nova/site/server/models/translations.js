/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('translations', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    text: {
      type: DataTypes.STRING(2040),
      allowNull: false
    },
    languageId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    keyId: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'translations'
  });
};
