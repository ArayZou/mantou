var mongoose = require('mongoose'),
    Post;
require('../models/post');
Post = mongoose.model('Post');
//发帖
exports.write = function(req, res) {
    var req_body = req.body;

    Post.find({name: req_body.posttitle}, function(err, post) {
        if (err) {
            console.log(err);
        }

        if (post.length > 0) {
            return res.redirect('/');
        } else {
            post = new Post({
                title: req_body.posttitle,
                content: req_body.postcontent,
                user: {
                    name:req_body.username
                },
                group:{
                    groupName:req_body.groupname
                }
            });

            post.save(function(err, post) {
                if (err) {
                    console.log(err);
                }
                // res.redirect('');
            });
        }
    });
};
