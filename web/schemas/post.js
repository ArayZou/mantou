var mongoose = require('mongoose'),
    postSchema;

postSchema = new mongoose.Schema({
    title: {
        unique: true,
        type: String
    },
    content: String,
    user: {
        name : {
            type: String
        }
    },
    group:{
        groupName : {
            type: String
        }
    }
});

module.exports = postSchema;
