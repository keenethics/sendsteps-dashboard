/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('zoho_payments', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    zohoCustomerId: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    zohoPaymentId: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    stripeChargeId: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'zoho_payments'
  });
};
