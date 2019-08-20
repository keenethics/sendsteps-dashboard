/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('wordcloudsettings', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    rotation: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    font: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    maxWords: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    oneWordPerLine: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    },
    colorType: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    baseColors: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    refreshRate: {
      type: DataTypes.INTEGER(6),
      allowNull: false
    }
  }, {
    tableName: 'wordcloudsettings'
  });
};
