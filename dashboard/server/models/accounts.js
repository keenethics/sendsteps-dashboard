/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('accounts', {
    id: {
      type: DataTypes.INTEGER(11),
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    timezone: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    users: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    maxPrepaidUsers: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    audienceSize: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    responseCodeBase: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    pluginId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'addinsettings',
        key: 'id'
      }
    },
    university: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    postalCode: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    city: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    country: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    phonenumber: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    licenceType: {
      type: DataTypes.ENUM('daily','monthly','yearly'),
      allowNull: false
    },
    paymentAmount: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    paymentMethod: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    vatId: {
      type: DataTypes.STRING(75),
      allowNull: true
    },
    minimumUserInactivityTime: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    allowedDaily: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    },
    accountOwner: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    always_renew_license: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    },
    sendstepsEducation: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: 'accounts'
  });
};
