/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('payments', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    paymentAmount: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    shopperReference: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    recurring: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    accountId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    audienceSize: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    users: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    status: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    brandCode: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    licenceType: {
      type: DataTypes.ENUM('daily','monthly','yearly'),
      allowNull: false
    },
    orderId: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    sessionId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    invoiceId: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'payments'
  });
};
