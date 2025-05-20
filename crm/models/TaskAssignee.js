'use strict';
module.exports = (sequelize, DataTypes) => {
  const TaskAssignee = sequelize.define('TaskAssignee', {
    taskId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  TaskAssignee.associate = function(models) {
    TaskAssignee.belongsTo(models.User, { foreignKey: 'userId' });
    TaskAssignee.belongsTo(models.Task, { foreignKey: 'taskId' });
  };

  return TaskAssignee;
};
