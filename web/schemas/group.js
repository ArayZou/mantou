var mongoose = require('mongoose'),
    groupSchema;

groupSchema = new mongoose.Schema({
    name: {
        unique: true,
        type: String
    },
    groupId: Number,
    hoster:{
        name: {
            unique: true,
            type: String
        }
    },
    intro: String,
    link: String,
    weixin: String,
    weibo: String
});

module.exports = groupSchema;
