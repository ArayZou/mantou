var mongoose = require('mongoose'),
    Post,
    Group;
require('../models/post');
require('../models/group');
Post = mongoose.model('Post');
Group = mongoose.model('Group');
exports.findgroup = function(req, res) {

    Group.find(function(err, group) {
        if (err) {
            console.log(err);
        }

        var groupArray = group;

        res.render('findgroup', {
            js:[{js:'group'}],
            title: 'findgroup',
            groupArray: groupArray,
        });
    });
}

exports.findarticle = function(req, res) {
    var groupName = req.params.groupname;
    var groupPost = [];

    Post.find(function(err, post) {
        if (err) {
            console.log(err);
        }

        postArray = post;

        res.render('findarticle', {
            js:[{js:'group'}],
            title: 'findarticle',
            postArray: postArray,
        });
    });
}
