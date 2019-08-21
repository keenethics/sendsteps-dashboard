/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('response_redirects', {
    old_domain: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    new_domain: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    percentage: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    tableName: 'response_redirects'
  });
};
