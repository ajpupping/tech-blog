const sequelize = require('../config/connection');
const Sequelize = require('sequelize');

const User = require('./User')
const Post = require('./Post')

// Associations
User.hasMany(Post, {
    foreignKey: 'userId',
});

Post.belongsTo(User, {
    foreignKey: 'userId',
});

module.exports = { sequelize, User, Post };
