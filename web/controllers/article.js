var mongoose = require('mongoose'),
    Post,
    Group;
require('../models/post');
require('../models/group');
Post = mongoose.model('Post');
Group = mongoose.model('Group');
module.exports = function(req, res) {
    var groupName = req.params.groupname;
        articleid = req.params.articleid;
    var postArray = [],
        thisArticle = {};

    Group.find({name:groupName},function(err, thisgroup) {
        if (err) {
            console.log(err);
        }
        if (thisgroup.length>0){

            Post.find({group:thisgroup[0]._id}).populate({path:'floor.user group'}).exec(function (err, post) {
                if (err) {
                    console.log(err);
                }

                postArray = post;
                Post.findOne({postId: articleid}).populate({path:'floor.user group'}).exec(function(err, post) {
                    thisArticle = post;
                    res.render('article', {
                        js:[{js:'group'}],
                        title: 'article-'+groupName,
                        groupname: groupName,
                        postArray: postArray,
                        article : thisArticle
                    });
                });
            })
        }
    });
}
