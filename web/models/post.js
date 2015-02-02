var mongoose = require('mongoose'),
    postSchema = require('../schemas/post'),
    post = mongoose.model('Post', postSchema);

module.exports = post;

