/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('vote_runs', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    vote_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'votes',
        key: 'id'
      }
    },
    presentation_id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      references: {
        model: 'presentations',
        key: 'id'
      }
    },
    session_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'sessions',
        key: 'id'
      }
    },
    open_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    close_time: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'vote_runs'
  });
};
