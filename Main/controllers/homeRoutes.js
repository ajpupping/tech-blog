const express = require('express');
const router = express.Router();
const { Post } = require('../models');

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

module.exports = router;
