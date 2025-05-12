'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Email extends Model {

    static associate(models) {
      Email.belongsTo(models.User, { foreignKey: 'userId' });
      
    }
  }
  Email.init({
    thread_id: DataTypes.STRING,
    from_address: DataTypes.STRING,
    to_addresses: DataTypes.TEXT,
    cc_addresses: DataTypes.TEXT,
    bcc_addresses: DataTypes.TEXT,
    subject: DataTypes.STRING,
    body: DataTypes.TEXT,
    sent_at: DataTypes.DATE,
    status: DataTypes.STRING,
    related_to: DataTypes.STRING,
    related_id: DataTypes.INTEGER,
    userId: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Email',
  });
  return Email;
};