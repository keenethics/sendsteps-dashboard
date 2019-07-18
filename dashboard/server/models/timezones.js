/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('timezones', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    order: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    utc_timezone: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    identifier: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    countryIsoCode: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'timezones',
    timestamps: false
  });
};
