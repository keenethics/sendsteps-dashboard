/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('participants', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    sessionId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'sessions',
        key: 'id'
      }
    },
    loginCode: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    },
    voteWeight: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '1'
    },
    isAnonymous: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '1'
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    phpSessionId: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    phoneNumber: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    twitterName: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    logged_in: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    },
    starMembership: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    participantAdminId: {
      type: DataTypes.INTEGER(10),
      allowNull: true
    }
  }, {
    tableName: 'participants'
  });
};
