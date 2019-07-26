/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const Session = sequelize.define(
    'sessions',
    {
      id: {
        type: DataTypes.INTEGER(10),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      userId: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        defaultValue: '0'
      },
      accountId: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        defaultValue: '0'
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      loginCode: {
        type: DataTypes.STRING(32),
        allowNull: true
      },
      loginToken: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      startTime: {
        type: DataTypes.DATE,
        allowNull: false
      },
      endTime: {
        type: DataTypes.DATE,
        allowNull: false
      },
      running: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue: '0'
      },
      audienceSize: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        defaultValue: '0'
      },
      timezone: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      textMessagingSelected: {
        type: DataTypes.INTEGER(1),
        allowNull: false
      },
      phoneNumberId: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        references: {
          model: 'phonenumbers',
          key: 'id'
        }
      },
      textMessagingKeyword: {
        type: DataTypes.STRING(32),
        allowNull: false
      },
      internetSelected: {
        type: DataTypes.INTEGER(1),
        allowNull: false
      },
      twitterSelected: {
        type: DataTypes.INTEGER(1),
        allowNull: false
      },
      internetKeyword: {
        type: DataTypes.STRING(32),
        allowNull: false
      },
      autoLogoutTime: {
        type: DataTypes.DATE,
        allowNull: false
      },
      supportedProducts: {
        type: "SET('VOTING','POSTING')",
        allowNull: false,
        defaultValue: 'voting,posting'
      },
      type: {
        type: DataTypes.ENUM(
          'free',
          'pre-paid',
          'subscription',
          'subscription - legacy',
          'pre-paid - educational',
          'subscription - educational'
        ),
        allowNull: false,
        defaultValue: 'free'
      },
      pluginId: {
        type: DataTypes.INTEGER(11),
        allowNull: false
      },
      anonymousSources: {
        type: DataTypes.INTEGER(4),
        allowNull: false,
        defaultValue: '1'
      },
      internetAddressOverwrite: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: ''
      },
      twitterAddressOverwrite: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: ''
      },
      language: {
        type: DataTypes.CHAR(2),
        allowNull: false,
        defaultValue: 'en'
      },
      emailAddress: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: ''
      },
      quizMode: {
        type: DataTypes.INTEGER(4),
        allowNull: false,
        defaultValue: '1'
      },
      twitterFeedHashtags: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      autoApprove: {
        type: DataTypes.INTEGER(4),
        allowNull: false,
        defaultValue: '-1'
      },
      autoApproveInterval: {
        type: DataTypes.INTEGER(3),
        allowNull: true,
        defaultValue: '5'
      },
      moderatorSharingToken: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      hasUpvoting: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue: '0'
      },
      liveParticipantCount: {
        type: DataTypes.INTEGER(10),
        allowNull: true,
        defaultValue: '0'
      }
    },
    {
      tableName: 'sessions'
    }
  );

  return Session;
};
