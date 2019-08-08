/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('nonsessionmessages', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    source: {
      type: "BINARY(40)",
      allowNull: false
    },
    destination: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    text: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: '0000-00-00 00:00:00'
    },
    connection: {
      type: DataTypes.STRING(32),
      allowNull: false,
      defaultValue: ''
    }
  }, {
    tableName: 'nonsessionmessages'
  });
};
