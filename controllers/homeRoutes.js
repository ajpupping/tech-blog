const express = require('express');
const router = express.Router();
const { Post } = require('./models');

// Render the homepage
router.get('/', async (req, res, next) => {
    try {
        const postData = await Post.findAll();
        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('home', { posts });
    } catch (err) {
        next(err);
    }
});

// Render the dashboard page
router.get('/dashboard', async (req, res, next) => {
    if (!req.session.userId) {
        res.redirect('/login');
        return;
    }
    try {
        const postData = await Post.findAll({
            where: {
                userId: req.session.userId,
            },
        });
        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('dashboard', { posts });
    } catch (err) {
        next(err);
    }
});

// Render the login page

router.get('/login', (req, res) => {
    if (req.session.userId) {
        return res.redirect('/dashboard');
    }
    res.render('login');
});


module.exports = router;
