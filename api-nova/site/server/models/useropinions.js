/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('useropinions', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    entryTime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: '0000-00-00 00:00:00'
    },
    product: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    rating: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    emailAddress: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    opinion: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    tableName: 'useropinions'
  });
};
