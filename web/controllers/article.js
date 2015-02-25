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

            Post.find({group:thisgroup[0]._id}).populate({path:'floor.user'}).exec(function (err, post) {
                if (err) {
                    console.log(err);
                }

                postArray = post;

                for(var i = 0;i<postArray.length;i++){
                    if(postArray[i].postId == articleid){
                        thisArticle = postArray[i];
                        break;
                    }
                }

                res.render('article', {
                    js:[{js:'group'}],
                    title: 'article-'+groupName,
                    groupname: groupName,
                    postArray: postArray,
                    article : thisArticle
                });
            })
        }
    });
}
