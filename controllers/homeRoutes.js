const express = require('express');
const router = express.Router();
const { Post } = require('../models');
const { authenticateUser } = require('../utils/auth');

// Render the homepage
router.get('/', async (req, res, next) => {
    try {
        const postData = await Post.findAll();
        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('homepage', { posts });
    } catch (err) {
        next(err);
    }
});

// Render the dashboard page
router.get('/dashboard', authenticateUser, async (req, res, next) => {
    try {
        const userPosts = await Post.findAll({
            where: {
                userId: req.session.userId,
            },
        });
        const posts = userPosts.map((post) => post.get({ plain: true }));
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


// Render the sign up page
router.get('/register', (req, res) => {
    res.render('register'); 
});

// Get posts
router.get('/posts', async (req, res, next) => {
    try {
        const posts = await Post.findAll();
        res.json(posts);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
