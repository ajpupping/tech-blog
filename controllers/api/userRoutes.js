const express = require('express');
const router = express.Router();
const { User } = require('../../models');
const bcrypt = require('bcrypt');


// Register a new user

router.post('/register', async (req, res, next) => {
    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const userData = await User.create({
            username: req.body.username,
            password: hashedPassword,
        });

        req.session.save(() => {
            req.session.userId = userData.id;
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
            const error = new Error('Incorrect username or password, please try again');
            error.status = 400;
            return next(error);
        }

        const validPassword = await bcrypt.compare(
            req.body.password, 
            userData.password
        );

        if (!validPassword) {
            const error = new Error('Incorrect username or password, please try again');
            error.status = 400;
            return next(error);
    }

    // If login is successful, save the session
    req.session.userId = userData.id;
    req.session.logged_in = true;
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