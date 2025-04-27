'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contact extends Model {

    static associate(models) {
      Contact.belongsTo(models.Customer, { foreignKey: 'customerId' });
      Contact.hasMany(models.Opportunity, { foreignKey: 'contactId' });
      Contact.hasMany(models.Ticket, { foreignKey: 'contactId' });
      Contact.belongsToMany(models.Meeting, { through: 'MeetingParticipants', foreignKey: 'contactId' });
    }
  }
  Contact.init({
    customerId: DataTypes.INTEGER,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    mobile: DataTypes.STRING,
    job_title: DataTypes.STRING,
    is_primary: DataTypes.BOOLEAN,
    notes: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Contact',
  });
  return Contact;
};