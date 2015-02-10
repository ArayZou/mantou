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
    var groupPost = [],
        thisArticle = {};
    Group.find({name:groupName},function(err, thisgroup) {
        if (err) {
            console.log(err);
        }
        if (thisgroup.length>0){
            Post.find({group:thisgroup[0]._id}, function(err, post) {
                if (err) {
                    console.log(err);
                }

                groupPost = post;

                for(var i = 0;i<groupPost.length;i++){
                    if(groupPost[i].postId == articleid){
                        thisArticle = groupPost[i];
                        break;
                    }
                }

                res.render('article', {
                    js:[{js:'group'}],
                    title: 'article-'+groupName,
                    groupname: groupName,
                    groupPost: groupPost,
                    article : thisArticle
                });
            });
        }
    });
}
