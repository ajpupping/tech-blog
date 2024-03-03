const express = require('express');
const router = express.Router();
const { User } = require('../../models');
const bcrypt = require('bcrypt');


// Register a new user

router.post('/register', async (req, res, next) => {
    try {
        const userData = await User.create({
            username: req.body.username,
            password: req.body.password,
        });

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        next(err);
    }
});

// Login 

router.post('/login', async (req, res, next) => {
    try {
        const userData = await User.findOne({
            where: {
                username: req.body.username } }); 
        if (!userData) {
            res.status(400).json({ message: 'Incorrect username or password, please try again' });
            return;
        }

        const validPassword = await bcrypt.compare(
            req.body.password, 
            userData.password
        );

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect username or password, please try again' });
            return;
        
    }

    res.json({ user: userData, message: 'You are now logged in!' });
    } catch (err) {
        next(err);
    }
});

// Logout

router.post('/logout', (req, res, next) => {
    if (req.session.logged_in) {
        req.session.destroy((err) => {
            if (err) {
                next(err);
            } else {
                res.status(204).end();
            }
        });
    } else {
    res.status(400).json({ message: 'Not logged in' });
    }
});

module.exports = router;