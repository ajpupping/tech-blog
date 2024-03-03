'use strict';

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'User',
            key: 'id',
        },
    },
}, {
    sequelize,
    modelName: 'Post',
    tableName: 'Posts',
});

module.exports = Post;

// const { Model, DataTypes } = require('sequelize');

// module.exports = (sequelize) => {
//     class Post extends Model {}

//     Post.init(
//     {
//         id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         primaryKey: true,
//         autoIncrement: true,
//         },
//         title: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },
//         content: {
//             type: DataTypes.TEXT,
//             allowNull: false,
//         },
//         userId: {
//             type: DataTypes.INTEGER,
//             references: {
//                 model: 'User',
//                 key: 'id',
//         },
//         },

//     },
//     {
//         sequelize, 
//         modelName: 'Post', 
//         timestamps: true,
//         freezeTableName: true,
//         underscored: true,
//     }
//     );

//     return Post;
// };
