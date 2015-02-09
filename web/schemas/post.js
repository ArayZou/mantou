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
            name : {
                type: String
            }
        },
        time: Date
    }],
    group:{
        groupName : {
            type: String
        }
    },
    readtimes: Number
});

module.exports = postSchema;
