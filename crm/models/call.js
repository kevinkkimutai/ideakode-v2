'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Call extends Model {

    static associate(models) {
      Call.belongsTo(models.User, { foreignKey: 'made_by' });
      Call.belongsTo(models.Contact, { foreignKey: 'call_with' });
    }
  }
  Call.init({
    related_to: DataTypes.STRING,
    related_id: DataTypes.INTEGER,
    made_by: DataTypes.INTEGER,
    call_with: DataTypes.INTEGER,
    direction: DataTypes.STRING,
    start_time: DataTypes.DATE,
    end_time: DataTypes.DATE,
    duration: DataTypes.INTEGER,
    notes: DataTypes.TEXT,
    recording_path: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Call',
  });
  return Call;
};