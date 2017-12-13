const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const User = new Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String
});


User.plugin(passportLocalMongoose);


module.export = mongoose.model('User', User);