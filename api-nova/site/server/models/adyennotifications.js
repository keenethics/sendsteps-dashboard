/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('adyennotifications', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    currency: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    value: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    eventCode: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    eventDate: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    merchantAccountCode: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    merchantReference: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    originalReference: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    pspReference: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    reason: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    success: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    paymentMethod: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    operations: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    additionalData: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    full: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    tableName: 'adyennotifications'
  });
};
