const express = require('express');
const router = express.Router();
const { Post } = require('./models');

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