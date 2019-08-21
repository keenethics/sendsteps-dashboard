/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('testsettings', {
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
    duration: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    audienceSize: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    textMessagingKeywordBase: {
      type: DataTypes.STRING(32),
      allowNull: false
    }
  }, {
    tableName: 'testsettings'
  });
};
