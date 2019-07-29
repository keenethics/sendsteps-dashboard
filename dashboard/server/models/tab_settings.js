/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tab_settings', {
    session_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'sessions',
        key: 'id'
      }
    },
    twitterfeed_hashtags: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    facebook_status: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      defaultValue: '1'
    },
    facebook_text: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    twitter_status: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      defaultValue: '1'
    },
    twitter_text: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    mail_status: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      defaultValue: '1'
    },
    mail_text: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    edit_answers: {
      type: DataTypes.INTEGER(4),
      allowNull: true,
      defaultValue: '0'
    }
  }, {
    tableName: 'tab_settings'
  });
};
