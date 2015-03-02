var mongoose = require('mongoose'),
    moment = require('moment'),
    Post,
    Group;
require('../models/post');
require('../models/group');
Post = mongoose.model('Post');
Group = mongoose.model('Group');
var marked = require('marked');
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

            Post.find({group:thisgroup[0]._id}).sort({'_id':-1}).populate({path:'floor.user group'}).exec(function (err, post) {
                if (err) {
                    console.log(err);
                }

                postArray = post;
                Post.findOne({postId: articleid}).populate({path:'floor.user group'}).exec(function(err, post) {
                    thisArticle = post;
                    for(var i= 0;i<thisArticle.floor.length;i++){
                        thisArticle.floor[i].content = marked(thisArticle.floor[i].content);
                        thisArticle.floor[i].timeFomate = moment(thisArticle.floor[i].time).format('lll');
                    }
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
