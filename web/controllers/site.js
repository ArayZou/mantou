var mongoose = require('mongoose'),
    Post,
    Group;
require('../models/post');
require('../models/group');
Post = mongoose.model('Post');
Group = mongoose.model('Group');
//index页
exports.index = function (req, res, next) {
    if(req.session.user){
        exports.home(req, res, next);
    }else{
        res.render('index', {
            js:[{js:'index'}],
            title: 'index'
        });
    }
}

//home页
exports.home = function (req, res, next) {
    var groupName = req.params.groupname;
    var groupPost = [];
    Group.find(function(err, group) {
        if (err) {
            console.log(err);
        }

        groupArray = group;

        Post.find(function(err, post) {
            if (err) {
                console.log(err);
            }

            groupPost = post;

            res.render('home', {
                js:[{js:'home'}],
                title: 'home',
                groupArray: groupArray,
                groupPost: groupPost
            });
        });
    });
}
