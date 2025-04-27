const { Setting } = require('../models'); // Import the Setting model

// Create a new setting
const createSetting = async (req, res) => {
  try {
    const { setting_key, setting_value, description, is_public } = req.body;

    // Create a new setting
    const setting = await Setting.create({
      setting_key,
      setting_value,
      description,
      is_public
    });

    return res.status(201).json({ message: 'Setting created successfully', setting });
  } catch (error) {
    console.error('Error creating setting:', error);
    return res.status(500).json({ message: 'Error creating setting', error: error.message });
  }
};

// Get all settings
const getAllSettings = async (req, res) => {
  try {
    const settings = await Setting.findAll();

    return res.status(200).json(settings);
  } catch (error) {
    console.error('Error fetching settings:', error);
    return res.status(500).json({ message: 'Error fetching settings', error: error.message });
  }
};

// Get a single setting by key
const getSettingByKey = async (req, res) => {
  try {
    const { key } = req.params;

    const setting = await Setting.findOne({ where: { setting_key: key } });

    if (!setting) {
      return res.status(404).json({ message: 'Setting not found' });
    }

    return res.status(200).json(setting);
  } catch (error) {
    console.error('Error fetching setting:', error);
    return res.status(500).json({ message: 'Error fetching setting', error: error.message });
  }
};

// Update a setting by key
const updateSetting = async (req, res) => {
  try {
    const { key } = req.params;
    const { setting_value, description, is_public } = req.body;

    const setting = await Setting.findOne({ where: { setting_key: key } });
    if (!setting) {
      return res.status(404).json({ message: 'Setting not found' });
    }

    // Update setting details
    setting.setting_value = setting_value;
    setting.description = description;
    setting.is_public = is_public;

    await setting.save();

    return res.status(200).json({ message: 'Setting updated successfully', setting });
  } catch (error) {
    console.error('Error updating setting:', error);
    return res.status(500).json({ message: 'Error updating setting', error: error.message });
  }
};

// Delete a setting by key
const deleteSetting = async (req, res) => {
  try {
    const { key } = req.params;

    const setting = await Setting.findOne({ where: { setting_key: key } });
    if (!setting) {
      return res.status(404).json({ message: 'Setting not found' });
    }

    await setting.destroy();

    return res.status(200).json({ message: 'Setting deleted successfully' });
  } catch (error) {
    console.error('Error deleting setting:', error);
    return res.status(500).json({ message: 'Error deleting setting', error: error.message });
  }
};

module.exports = {
  createSetting,
  getAllSettings,
  getSettingByKey,
  updateSetting,
  deleteSetting,
};
