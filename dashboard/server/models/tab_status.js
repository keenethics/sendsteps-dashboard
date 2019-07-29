/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tab_status', {
    session_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'sessions',
        key: 'id'
      }
    },
    tab_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'tab_name',
        key: 'tab_id'
      }
    },
    status: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    tab_index: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: 'tab_status'
  });
};
