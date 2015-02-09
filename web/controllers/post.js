var mongoose = require('mongoose'),
    Post;
require('../models/post');
Post = mongoose.model('Post');
//发帖
exports.write = function(req, res) {
    var req_body = req.body;

    Post.find({title: req_body.postTitle}, function(err, post) {
        if (err) {
            console.log(err);
        }

        if (post.length > 0) {
            res.send({
                message:'1'
            });
        } else {
            var postdate = new Date();
            var postTotal = 0;
            Post.find(function(err,post){
                if (err) {
                    console.log(err);
                }
                postTotal = post.length;

                post = new Post({
                    title: req_body.postTitle,
                    postId: postTotal + 1,
                    floor: [{
                        content: req_body.postContent,
                        user: {
                            name:req_body.userName
                        },
                        time: postdate
                    }],
                    group:{
                        groupName:req_body.groupName
                    }
                });

                post.save(function(err, post) {
                    if (err) {
                        console.log(err);
                    }
                    res.send({
                        groupname:req_body.groupName,
                        postId:postTotal + 1
                    });
                });
            });
        }
    });
};
