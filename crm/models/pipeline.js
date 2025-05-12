'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pipeline extends Model {

    static associate(models) {
      Pipeline.hasMany(models.Stage, { foreignKey: 'pipelineId' });
    }
  }
  Pipeline.init({
    name: DataTypes.STRING,
    is_default: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Pipeline',
  });
  return Pipeline;
};
