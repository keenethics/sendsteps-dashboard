/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tab_name', {
    tab_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    tab_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    tab_uri: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    tab_default_order: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    tableName: 'tab_name'
  });
};
