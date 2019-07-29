/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('moderatorvotes', {
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
    voteId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'votes',
        key: 'id'
      }
    }
  }, {
    tableName: 'moderatorvotes'
  });
};
