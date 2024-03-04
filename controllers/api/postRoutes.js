const express = require('express');
const router = express.Router();
const { Post } = require('../../models');
const { authenticateUser } = require('../../utils/auth');

// Get all posts

router.get('/', async (req, res, next) => {
    try {
        const postData = await Post.findAll();

        res.status(200).json(postData);
    } catch (err) {
        next(err);
    }
});

// Get all posts by session user
router.get('/userPosts', async (req, res, next) => {
    if (!req.session.userId) {
        return res.status(401).json({ message: 'Not logged in' });
    }

    try {
        const userPosts = await Post.findAll({
            where: { userId: req.session.userId }
        });
        res.json(userPosts);
    } catch (err) {
        next(err);
    }
});

// Create a new post

router.post('/', async (req, res, next) => {
    try {
        if (!req.session.userId) {
            return res.status(401).json({ message: 'Not logged in' });
        }
        const postData = await Post.create({
            ...req.body,
            userId: req.session.userId,
        });

        res.redirect('/dashboard');
    } catch (err) {
        next(err);
    }
});

// Get post for update

router.get('/update/:id', authenticateUser, async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await Post.findByPk(postId);

        // Check if the post exists
        if (!post) {
            return res.status(404).send('Post not found');
        } else {
            res.render('updatePost', { post: post.get({ plain: true }) });
        }
    } catch (error) {
        res.status(500).send('Server error');
        }
    });

// Delete a post

router.delete('/:id', async (req, res, next) => {
    try {
        const postId = req.params.id;
        const post = await Post.findByPk(postId);

        if(!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        if(post.userId !== req.session.userId) {
            return res.status(403).json({ message: 'Unauthorized' });
        } 
        await Post.destroy({
            where: {
                id: postId,
            },
        });

        res.json({message: 'Post deleted'});
    } catch (err) {
        next(err);
    }
});

module.exports = router;