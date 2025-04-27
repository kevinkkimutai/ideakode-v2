'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Meeting extends Model {

    static associate(models) {
    Meeting.belongsTo(models.User, { foreignKey: 'organizerId' });
    Meeting.belongsToMany(models.User, { 
      through: 'MeetingParticipants', 
      foreignKey: 'meetingId',
      as: 'Participants'
    });
    Meeting.belongsToMany(models.Contact, { 
      through: 'MeetingParticipants', 
      foreignKey: 'meetingId',
      as: 'GuestContacts'
    });
    }
  }
  Meeting.init({
    organizerId: DataTypes.INTEGER,
    subject: DataTypes.STRING,
    description: DataTypes.TEXT,
    location: DataTypes.STRING,
    meeting_Url: DataTypes.STRING,
    start_time: DataTypes.DATE,
    end_time: DataTypes.DATE,
    related_to: DataTypes.STRING,
    related_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Meeting',
  });
  return Meeting;
};