const express = require('express');
const router = express.Router();
const { Post } = require('../../models');

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
        const postData = await Post.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.userId,
        });

        res.status(200).json(postData);
    } catch (err) {
        next(err);
    }
});

// Update a post

router.put('/:id', async (req, res, next) => {
    try {
        const postData = await Post.update(req.body, {
            where: {
                id: req.params.id,
            },
        });

        if (!postData[0]) {
            res.status(404).json({ message: 'Post not found' });
            return;
        }

        res.status(200).json(postData);
    } catch (err) {
        next(err);
    }
});

// Delete a post

router.delete('/:id', async (req, res, next) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (!postData) {
            res.status(404).json({ message: 'Post not found' });
            return;
        }

        res.status(200).json(postData);
    } catch (err) {
        next(err);
    }
});

module.exports = router;