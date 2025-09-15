// Sequelize models export point
const { sequelize } = require('../config/database');
const Post = require('./post');

module.exports = {
  sequelize,
  Post
};