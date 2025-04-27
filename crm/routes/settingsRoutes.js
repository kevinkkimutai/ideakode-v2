const express = require('express');
const { createSetting, getAllSettings, getSettingByKey, updateSetting, deleteSetting } = require('../controllers/settingsController');
const router = express.Router();


// Create a new Setting
router.post('/settings', createSetting);

// Get all settings
router.get('/settings', getAllSettings);

// Get a single setting by key
router.get('/settings/:key', getSettingByKey);

// Update a setting by key
router.put('/settings/:key', updateSetting);

// Delete a setting by key
router.delete('/settings/:key', deleteSetting);

module.exports = router;
