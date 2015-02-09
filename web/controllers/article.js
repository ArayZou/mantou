var mongoose = require('mongoose'),
    Post;
require('../models/post');
Post = mongoose.model('Post');
module.exports = function(req, res) {
    var groupName = req.params.groupname;
        articleid = req.params.articleid;
    var groupPost = [],
        thisArticle = {};
    Post.find({group:{groupName: groupName}}, function(err, post) {
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

        console.log(thisArticle)
        res.render('article', {
            js:[{js:'group'}],
            title: 'article-'+groupName,
            groupname: groupName,
            groupPost: groupPost,
            article : thisArticle
        });
    });
}
