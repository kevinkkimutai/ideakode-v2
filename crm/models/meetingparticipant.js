'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MeetingParticipant extends Model {

    static associate(models) {
    MeetingParticipant.belongsTo(models.Meeting, { foreignKey: 'meetingId' });
    MeetingParticipant.belongsTo(models.User, { foreignKey: 'userId' });
    MeetingParticipant.belongsTo(models.Contact, { foreignKey: 'contactId' });
    }
  }
  MeetingParticipant.init({
    meetingId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    contactId: DataTypes.INTEGER,
    status: DataTypes.STRING,
    response_time: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'MeetingParticipant',
  });
  return MeetingParticipant;
};