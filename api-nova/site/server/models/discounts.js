/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('discounts', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    amount: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    isUsed: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    createdDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    usedDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    orderId: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    discountCode: {
      type: DataTypes.STRING(6),
      allowNull: false
    }
  }, {
    tableName: 'discounts'
  });
};
