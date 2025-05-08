'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProjectTaskAssignee = sequelize.define('ProjectTaskAssignee', {
    projectTaskId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  ProjectTaskAssignee.associate = function(models) {
    ProjectTaskAssignee.belongsTo(models.User, { foreignKey: 'userId' });
    ProjectTaskAssignee.belongsTo(models.ProjectTask, { foreignKey: 'projectTaskId' });
  };

  return ProjectTaskAssignee;
};
