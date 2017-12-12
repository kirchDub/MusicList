const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String
});

module.export = mongoose.model('User', User);