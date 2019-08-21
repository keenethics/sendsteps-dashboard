/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('moderatorlocks', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    sessionId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'sessions',
        key: 'id'
      }
    },
    locked: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      defaultValue: '1'
    },
    isWebbased: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    }
  }, {
    tableName: 'moderatorlocks'
  });
};
