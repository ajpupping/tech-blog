// models/index.js
const User = require('./User');
const Post = require('./Post');

// Associations
User.hasMany(Post, {
    foreignKey: 'userId',
});

Post.belongsTo(User, {
    foreignKey: 'userId',
});

module.exports = { User, Post };
