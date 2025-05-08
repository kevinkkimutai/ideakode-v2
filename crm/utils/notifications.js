// utils/notifications.js
const { Notification } = require('../models');

const sendNotification = async (userId, message, taskId = null) => {
  await Notification.create({
    userId,
    message,
    taskId,
    title: 'Task Overdue',
    read: false,
  });

  // Optional: emit with socket if needed
  // io.to(userId).emit('notification', { message });
};

module.exports = { sendNotification };
