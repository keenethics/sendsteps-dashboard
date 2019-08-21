/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('survey', {
    survey_id: {
      type: DataTypes.INTEGER(20),
      allowNull: false,
      primaryKey: true
    },
    survey_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    start_datetime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    end_datetime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    created_datetime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    session_id: {
      type: DataTypes.INTEGER(20),
      allowNull: false,
      references: {
        model: 'sessions',
        key: 'id'
      }
    },
    utc_timezone: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    survey_utc_timezone_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    status: {
      type: DataTypes.INTEGER(4),
      allowNull: false
    },
    server_start_datetime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    server_end_datetime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    isDeleted: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    },
    dateDeleted: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'survey'
  });
};
