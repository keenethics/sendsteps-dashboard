/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('freesessionhashtags', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    hashtag: {
      type: DataTypes.STRING(32),
      allowNull: false
    }
  }, {
    tableName: 'freesessionhashtags'
  });
};
