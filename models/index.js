const sequelize = require('../config/connection');
const Sequelize = require('sequelize');

const User = require('./User')(sequelize, Sequelize.DataTypes);
const Post = require('./Post')(sequelize, Sequelize.DataTypes);

// Associations
User.hasMany(Post, {
    foreignKey: 'userId',
});

Post.belongsTo(User, {
    foreignKey: 'userId',
});

module.exports = { sequelize, User, Post };
