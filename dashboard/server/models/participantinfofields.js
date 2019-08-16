/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('participantinfofields', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    type: {
      type: DataTypes.ENUM('textbox','textarea','dropdown','radio','checkbox'),
      allowNull: false,
      defaultValue: 'textbox'
    },
    allowedValues: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    sessionId: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false
    },
    fieldIndex: {
      type: DataTypes.INTEGER(5).UNSIGNED,
      allowNull: false
    },
    deleted: {
      type: DataTypes.INTEGER(4),
      defaultValue: '0',
      allowNull: false
    },
    isRequired: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      defaultValue: '1'
    },
    isIdentifier: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: 'participantinfofields'
  });
};
