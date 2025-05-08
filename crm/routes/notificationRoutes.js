const express = require('express');
const router = express.Router();
const {auth, authorizeRole} = require('../middleware/auth');
const { getNotifications, markAsRead, triggerScan } = require('../controllers/notificationController');
const { checkOverdueTasks } = require('../jobs/notifyOverdueTasks');

router.get('/notifications', auth, getNotifications);
router.get("/notification-scan", auth, triggerScan)
router.put('/read-notification', auth, markAsRead);

router.get('/test-overdue', async (req, res) => {
    try {
      await checkOverdueTasks();
      res.json({ message: 'Overdue task check completed' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

module.exports = router;
