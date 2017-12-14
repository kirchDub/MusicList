const express = require('express');
const passport = require('passport');
const User = require('../../models/user.js');

const router = express.Router();

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
router.post('/login', (req, res) => {
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