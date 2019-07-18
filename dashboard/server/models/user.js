const bcrypt = require('bcrypt');
// for using .env variables
require('dotenv-safe').config();

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'user',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true
      },
      accountId: {
        type: DataTypes.INTEGER(11),
        allowNull: false
      },
      createdByUserId: {
        type: DataTypes.INTEGER(11),
        defaultValue: null
      },
      departmentId: {
        type: DataTypes.INTEGER(11),
        defaultValue: null
      },
      departmentName: {
        type: DataTypes.STRING(50),
        defaultValue: null
      },
      emailUnconfirmed: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        defaultValue: null
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      auth_key: {
        type: DataTypes.STRING(32),
        allowNull: false
      },
      password_reset_token: {
        type: DataTypes.STRING,
        defaultValue: null
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      userType: {
        type: DataTypes.ENUM('user', 'manager', 'admin'),
        allowNull: false,
        defaultValue: 'user'
      },
      role: {
        type: DataTypes.ENUM('user', 'manager', 'admin'),
        allowNull: false
      },
      isDeleted: {
        type: DataTypes.TINYINT(1),
        allowNull: false
      },
      createdDate: {
        type: DataTypes.DATE,
        allowNull: false
      },
      lastUsedDate: {
        type: DataTypes.DATE,
        allowNull: false
      },
      created_at: {
        type: DataTypes.INTEGER(11),
        allowNull: false
      },
      updated_at: {
        type: DataTypes.INTEGER(11),
        allowNull: false
      },
      isFirstLogin: {
        type: DataTypes.TINYINT(4),
        allowNull: false,
        defaultValue: '1'
      },
      isGuidedTourTake: {
        type: DataTypes.TINYINT(4),
        allowNull: false,
        defaultValue: '1'
      },
      filename: {
        type: DataTypes.STRING(100),
        defaultValue: null
      },
      phonenumber: {
        type: DataTypes.STRING,
        defaultValue: null
      },
      moderatorSharingToken: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      deletedEmail: {
        type: DataTypes.STRING,
        defaultValue: null
      },
      numberOfAttempts: {
        type: DataTypes.SMALLINT(6),
        defaultValue: null
      },
      language: {
        type: DataTypes.STRING(10),
        defaultValue: null
      },
      os: {
        type: DataTypes.STRING(100),
        defaultValue: null
      },
      browser: {
        type: DataTypes.STRING(100),
        defaultValue: null
      },
      origin: {
        type: DataTypes.STRING(50),
        defaultValue: null
      },
      lockTime: {
        type: DataTypes.INTEGER(11),
        defaultValue: null
      },
      termsAccepted: {
        type: DataTypes.TINYINT(1),
        defaultValue: null
      },
      newsletterAccepted: {
        type: DataTypes.TINYINT(1),
        defaultValue: null
      },
      techEmailAccepted: {
        type: DataTypes.TINYINT(1),
        defaultValue: null
      },
      dateDeleted: {
        type: DataTypes.DATE,
        defaultValue: null
      },
      paymentMethodId: {
        type: DataTypes.INTEGER(11),
        defaultValue: null
      }
    },
    {
      timestamps: false,
      charset: 'utf8',
      collate: 'utf8_unicode_ci',
      indexes: [
        {
          name: 'accountId',
          using: 'BTREE',
          fields: ['accountId', 'departmentId']
        },
        {
          name: 'accountId_2',
          using: 'BTREE',
          fields: ['accountId']
        }
      ]
    }
  );

  User.beforeCreate(async user => {
    user.accountId = 0;
    user.emailUnconfirmed = '';
    user.auth_key = '';
    user.role = 'admin';
    user.isDeleted = 0;
    user.createdDate = new Date().toLocaleString();
    user.lastUsedDate = new Date().toLocaleString();
    user.created_at = Math.round(Date.now() / 1000);
    user.updated_at = Math.round(Date.now() / 1000);
    user.moderatorSharingToken = '';

    user.password = bcrypt.hashSync(
      user.password,
      parseInt(process.env.SALT_ROUNDS)
    );
  });

  User.prototype.comparePassword = function comparePassword(password) {
    return bcrypt.compareSync(password, this.password);
  };

  return User;
};
