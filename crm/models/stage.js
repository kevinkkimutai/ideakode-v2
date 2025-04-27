'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Stage extends Model {

    static associate(models) {
    Stage.belongsTo(models.Pipeline, { foreignKey: 'pipelineId' });
    Stage.hasMany(models.Opportunity, { foreignKey: 'stageId' });
    }
  }
  Stage.init({
    pipelineId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    probability: DataTypes.DECIMAL,
    position: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Stage',
  });
  return Stage;
};