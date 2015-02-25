var mongoose = require('mongoose'),
    postSchema;

postSchema = new mongoose.Schema({
    title: {
        unique: true,
        type: String
    },
    postId: Number,
    floor:[{
        content: String,
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        time: Date
    }],
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group'
    },
    readtimes: Number
});

module.exports = postSchema;
