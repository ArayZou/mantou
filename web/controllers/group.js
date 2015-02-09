var mongoose = require('mongoose'),
    Post;
require('../models/post');
Post = mongoose.model('Post');
module.exports = function(req, res) {
    var groupName = req.params.groupname;
    var groupPost = [];
    Post.find({group:{groupName: groupName}}, function(err, post) {
        if (err) {
            console.log(err);
        }

        groupPost = post;

        res.render('group', {
            js:[{js:'group'}],
            title: 'group-'+groupName,
            groupname: groupName,
            groupPost: groupPost
        });
    });
}
