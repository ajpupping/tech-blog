const express = require('express');
const handlebars = require('express-handlebars');

const app = express();

app.engine('handlebars', handlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.get('/', async (req, res, next) => {
    try {
        const postData = await postMessage.findAll();
        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('home', { posts });
    } catch (err) {
        next(err);
    }
});

app.get('/dashboard', async (req, res, next) => {
    try {
        const userPostData = await Post.findAll({
            where: {
                user_id: req.session.user_id,
            },
        });
        const posts = userPostData.map((post) => post.get({ plain: true }));
        res.render('dashboard', { posts });
        } catch (err) {
            next(err);
        }
});

const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);