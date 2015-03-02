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
    var postArray = [];

    Post.find().sort({'_id':-1}).populate({path:'group'}).exec(function(err, post) {
        if (err) {
            console.log(err);
        }

        postArray = post;

        res.render('home', {
            js:[{js:'home'}],
            title: 'home',
            postArray: postArray
        });
    });
}
