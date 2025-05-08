const cron = require('node-cron');
const { Op } = require('sequelize');
const { ProjectTask, User, Notification } = require('../models');
const { sendNotification } = require('../utils/notifications');

cron.schedule('0 0 * * *', async () => {
  const today = new Date().toISOString().split('T')[0];

  try {
    const overdueTasks = await ProjectTask.findAll({
      where: {
        due_date: { [Op.lt]: today },
        status: { [Op.not]: 'Completed' }
      },
      include: [
        {
          model: User,
          as: 'Assignees',
          through: { attributes: [] }
        }
      ]
    });

    for (const task of overdueTasks) {

      if (!task.Assignees || task.Assignees.length === 0) {
        continue;
      }

      for (const user of task.Assignees) {

        const existing = await Notification.findOne({
          where: {
            userId: user.id,
            taskId: task.id,
            title: 'Task Overdue'
          }
        });

        if (existing) {
          continue;
        }

        await sendNotification(user.id, `⚠️ Task "${task.name}" is overdue.`, task.id);
      }
    }

  } catch (error) {
    console.error(`[CRON ERROR]`, error.message);
  }
});
