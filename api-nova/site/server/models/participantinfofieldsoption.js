/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('participantinfofieldsoption', {
    id: {
      type: DataTypes.INTEGER(11),
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    participantinfofieldsId: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      references: {
        model: 'participantinfofields',
        key: 'id'
      }
    },
    allowedValues: {
      type: DataTypes.STRING(175),
      allowNull: false
    }
  }, {
    tableName: 'participantinfofieldsoption'
  });
};
