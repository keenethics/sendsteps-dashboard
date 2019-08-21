/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const phonenumbers = sequelize.define(
    'phonenumbers',
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true
      },
      phoneNumber: {
        type: DataTypes.STRING(32),
        allowNull: false
      },
      displayText: {
        type: DataTypes.STRING(32),
        allowNull: false
      },
      isDeleted: {
        type: DataTypes.INTEGER(1),
        allowNull: false
      },
      public: {
        type: DataTypes.INTEGER(1),
        allowNull: false
      },
      countryIsoCode: {
        type: DataTypes.CHAR(3),
        allowNull: false,
        references: {
          model: 'countries',
          key: 'isocode'
        }
      },
      foreignerCompatible: {
        type: DataTypes.INTEGER(1),
        allowNull: false
      },
      keywordAvailability: {
        type: DataTypes.ENUM('dedicated', 'shared'),
        allowNull: false,
        defaultValue: 'dedicated'
      },
      excludeFromStatusCheck: {
        type: DataTypes.INTEGER(1).UNSIGNED,
        allowNull: false,
        defaultValue: '0'
      }
    },
    {
      tableName: 'phonenumbers'
    }
  );

  return phonenumbers;
};
