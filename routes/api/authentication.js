const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const User = require('../../models/user.js');

const router = express.Router();

// configure mongoose promises
mongoose.Promise = global.Promise;

//POST to /register
router.post('/register', (req, res) => {
    //Create a user object using values from incoming JSON
    const newUser = new User(req.body);
    //Save, via Passport Register method, the user
    User.register(newUser, req.body.password, (err, user) => {
        // if there is a problem send back JSON with the error
        if (err) {
            return res.send(JSON.stringify({error: err}));
        }
        //Otherwise, for now, send back a JSON object with the new user's info
        return res.send(JSON.stringify(user));
    });
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
        //Otherwise, return an error
        return res.send(JSON.stringify({error: err}));
    });
});

//POST to /logout
router.get('/logout', (req, res) => {
    req.logout();
    return res.send(JSON.stringify(req.user));
});

module.exports = router;