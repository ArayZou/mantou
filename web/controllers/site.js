var mongoose = require('mongoose'),
    Post;
require('../models/post');
Post = mongoose.model('Post');
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
    Post.find(function(err, post) {
        if (err) {
            console.log(err);
        }

        groupPost = post;

        res.render('home', {
            js:[{js:'home'}],
            title: 'home',
            groupPost: groupPost
        });
    });
}
