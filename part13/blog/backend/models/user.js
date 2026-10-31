const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../utils/db.js');

class User extends Model {}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { notEmpty: true }
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true, notEmpty: true }
  }
}, {
  sequelize,
  underscored: true,
  modelName: 'user'
})

module.exports = User;
