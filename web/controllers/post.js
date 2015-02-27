var mongoose = require('mongoose'),
    Post,
    Group;
require('../models/post');
require('../models/group');
Post = mongoose.model('Post');
Group = mongoose.model('Group');
//发帖
exports.write = function(req, res) {
    var req_body = req.body;
    var person = req.session.user;

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
                        user: person._id,
                        time: postdate
                    }]
                });

                Group.find({name:req_body.groupName},function(err,groupdata){
                    if (err) {
                        console.log(err);
                    }
                    if(groupdata.length=1){
                        post.group = groupdata[0]._id;

                        post.save(function(err, post) {
                            if (err) {
                                console.log(err);
                            }
                            res.send({
                                groupname:req_body.groupName,
                                postId:postTotal + 1
                            });
                        });
                    }else{
                        res.send({
                            message:'2'
                        });
                    }
                });
            });
        }
    });
};
//跟帖
exports.reply = function(req, res) {
    var req_body = req.body;
    var person = req.session.user;

    Post.findOne({postId: req_body.articleid}, function(err, post) {
        if (err) {
            console.log(err);
        }

        var replydate = new Date();
        var newfloor = {
            content: req_body.replyContent,
            user: person._id,
            time: replydate
        }

        post.floor.push(newfloor);

        post.save(function(err, post) {
            if (err) {
                console.log(err);
            }
            res.send({
                success:true
            });
        });
    });
};
