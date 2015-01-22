var mongoose = require('mongoose'),
    userSchema = require('../schemas/user'),
    user = mongoose.model('User', userSchema);

module.exports = user;

