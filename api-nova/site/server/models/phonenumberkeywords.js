/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('phonenumberkeywords', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    phoneNumberId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'phonenumbers',
        key: 'id'
      }
    },
    keyword: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    tableName: 'phonenumberkeywords'
  });
};
