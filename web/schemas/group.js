var mongoose = require('mongoose'),
    groupSchema;

groupSchema = new mongoose.Schema({
    name: {
        unique: true,
        type: String
    },
    groupId: Number,
    hoster:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    intro: String,
    link: String,
    weixin: String,
    weibo: String
});

module.exports = groupSchema;
