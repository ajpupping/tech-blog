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

            res.redirect('/');
        });
    } catch (err) {
        next(err);
    }
});

// Login 

router.post('/login', async (req, res, next) => {
    try {
        const userData = await User.findOne({
            where: { username: req.body.username }
        });

        if (!userData) {
            return res.status(400).json({message: 'Incorrect username or password'});
        }
        
        const validPassword = await bcrypt.compare(req.body.password, userData.password);

        if (validPassword) {
            req.session.userId = userData.id;
            req.session.logged_in = true;

            req.session.save(err => {
                if (err) {
                    next(err);
                } else {
                    res.redirect('/');
                }
            });
        } else {
            res.status(400).json({message: 'Incorrect username or password'})
        }
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
            } 
            res.redirect('/login');
        });
    } else {
        res.status(400).send('Not logged in'); 
    }
});

module.exports = router;