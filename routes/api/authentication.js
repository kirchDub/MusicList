const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const User = require('../../models/user.js');

const router = express.Router();

// configure mongoose promises
mongoose.Promise = global.Promise;

// GET to /checksession
router.get('/checksession', (req, res) => {
    if (req.user) {
    return res.send(JSON.stringify(req.user));
    }
    return res.send(JSON.stringify({}));
});

//POST to /logout
router.get('/logout', (req, res) => {
    req.logout();
    return res.send(JSON.stringify(req.user));
});

//POST to /login
router.post('/login', async (req, res) => {
    // look up the user by their email
    const query = User.findOne({ email: req.body.email });
    const foundUser = await query.exec();

    // if they exist, they'll have a username, so add that to our body
    if (foundUser) { req.body.username = foundUser.username; }
    
    passport.authenticate('local')(req, res, () => {
        // if logged in we should have user info to send back
        if (req.user) {
            return res.send(JSON.stringify(req.user));
        }
        
        // Otherwise log them in
        return passport.authenticate('local')(req, res, () => {
            // If logged in, we should have user info to send back
            if (req.user) {
            return res.send(JSON.stringify(req.user));
            }
            // Otherwise return an error
            return res.send(JSON.stringify({ error: 'There was an error logging in' }));
        });
    });
});

//POST to /register
router.post('/register', async (req, res) => {
    // First, check and make sure the email doesn't already exist
    const query = User.findOne({ email: req.body.email });
    const foundUser = await query.exec();

    if (foundUser) { return res.send(JSON.stringify({ error: 'Email or username already exists' })); }
    // Create a user object to save, using values from incoming JSON
    if (!foundUser) {
        //Create a user object using values from incoming JSON
        const newUser = new User(req.body);
        //Save, via Passport Register method, the user
        User.register(newUser, req.body.password, (err) => {
            // if there is a problem send back JSON with the error
            if (err) {
                return res.send(JSON.stringify({error: err}));
            }
            // Otherwise log them in
            return passport.authenticate('local')(req, res, () => {
                // If logged in, we should have user info to send back
                if (req.user) {
                return res.send(JSON.stringify(req.user));
                }
                // Otherwise return an error
                return res.send(JSON.stringify({ error: 'There was an error registering the user' }));
            });
        });
    }
});

module.exports = router;