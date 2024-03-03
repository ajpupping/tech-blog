// const express = require('express');
// const handlebars = require('express-handlebars');

const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    'blog_db',
    'root', 
    null,
    {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306,
    }
);

sequelize.authenticate().then(() => {
    console.log('Connection to the database has been established successfully.');
}).catch((err) => {
    console.error('Unable to connect to the database:', err);
});

// const app = express();

// app.engine('handlebars', handlebars({ defaultLayout: 'main' }));
// app.set('view engine', 'handlebars');

// app.get('/', async (req, res) => {
//     try {
//         const postData = await postMessage.findAll();
//         const posts = postData.map((post) => post.get({ plain: true }));

//         res.render('home', { posts });
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

// app.get('/dashboard', async (req, res) => {
//     try {
//         const userPostData = await Post.findAll({
//             where: {
//                 user_id: req.session.user_id,
//             },
//         });
//         const posts = userPostData.map((post) => post.get({ plain: true }));
//         res.render('dashboard', { posts });
//         } catch (err) {
//             res.status(500).json(err);
//         }
// });