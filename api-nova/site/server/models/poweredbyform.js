/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('poweredbyform', {
    answerID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    response: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    domain_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    friend_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    friend_email: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    type: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    language: {
      type: DataTypes.STRING(3),
      allowNull: false
    },
    presenter_user_id: {
      type: DataTypes.STRING(20),
      allowNull: true
    }
  }, {
    tableName: 'poweredbyform'
  });
};
