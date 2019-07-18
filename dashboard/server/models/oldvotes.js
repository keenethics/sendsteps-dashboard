/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('oldvotes', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    oldVoteMasterId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    newVoteId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'votes',
        key: 'id'
      }
    }
  }, {
    tableName: 'oldvotes'
  });
};
