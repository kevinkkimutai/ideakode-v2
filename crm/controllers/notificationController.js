const { Notification, ProjectTask, User } = require('../models');
const moment = require('moment');
const { Op } = require('sequelize');
const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.findAll({
      where: { userId: req.user.id },
      order: [['createdAt', 'DESC']]
    });
    res.status(200).json(notifications);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching notifications', error: err.message });
  }
};


const checkAndCreateOverdueTaskNotifications = async () => {
    const today = moment().format('YYYY-MM-DD');
  
    const overdueTasks = await ProjectTask.findAll({
      where: {
        due_date: { [Op.lt]: today },
        status: { [Op.ne]: 'Completed' }
      },
      include: [
        {
          model: User,
          as: 'Assignees',
          attributes: ['id'],
          through: { attributes: [] }
        }
      ]
    });
  
    console.log(`[DEBUG] Found ${overdueTasks.length} overdue tasks`);
  
    for (const task of overdueTasks) {
      if (!task.Assignees || task.Assignees.length === 0) {
        console.log(`[DEBUG] Task "${task.name}" has no assignees`);
        continue;
      }
  
      for (const user of task.Assignees) {
        const existing = await Notification.findOne({
          where: {
            taskId: task.id,
            userId: user.id,
            title: 'Task Overdue'
          }
        });
  
        if (!existing) {
          await Notification.create({
            userId: user.id,
            taskId: task.id,
            title: 'Task Overdue',
            message: `⚠️ Task "${task.name}" is overdue!`,
            read: false
          });
  
          console.log(`[DEBUG] Notification created for user ${user.id} on task "${task.name}"`);
        } else {
          console.log(`[DEBUG] Notification already exists for user ${user.id} on task "${task.name}"`);
        }
      }
    }
  };
  

  // GET /notifications/scan
const triggerScan = async (req, res) => {
    try {
      await checkAndCreateOverdueTaskNotifications();
      res.status(200).json({ message: 'Scan complete' });
    } catch (error) {
      res.status(500).json({ message: 'Scan failed', error: error.message });
    }
  };
  

const markAsRead = async (req, res) => {
    try {
      const notification = await Notification.findOne({
        where: { id: req.params.id, userId: req.user.id }
      });
  
      if (!notification) return res.status(404).json({ message: 'Not found' });
  
      notification.isRead = true;
      await notification.save();
  
      res.json({ message: 'Marked as read' });
    } catch (err) {
      res.status(500).json({ message: 'Error updating notification', error: err.message });
    }
  };
  

module.exports = { getNotifications, markAsRead, checkAndCreateOverdueTaskNotifications, triggerScan };
