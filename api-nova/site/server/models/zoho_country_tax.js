/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('zoho_country_tax', {
    country_iso: {
      type: DataTypes.CHAR(2),
      allowNull: false,
      defaultValue: '',
      primaryKey: true,
      references: {
        model: 'countries',
        key: 'isocode'
      }
    },
    tax_id: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: '',
      primaryKey: true
    },
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: true
    }
  }, {
    tableName: 'zoho_country_tax'
  });
};
