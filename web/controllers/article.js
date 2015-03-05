var mongoose = require('mongoose'),
    moment = require('moment'),
    Post,
    Group;
require('../models/post');
require('../models/group');
Post = mongoose.model('Post');
Group = mongoose.model('Group');
var marked = require('marked');
var floorRenderer = new marked.Renderer();
//禁止marked.js转换链接
floorRenderer.link = function ( href, title, text) {
    return text;
};
floorRenderer.paragraph = function(text){
    var r,
        ss = text;
    r=ss.replace(/@[A-Za-z0-9_\-\u4e00-\u9fa5_\d]+/g, function(word){
        return "<a href=\""+ word +"\">" + word + "</a>";}
    );
    return r;
}
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
                        // 转换内容为Markdown格式
                        thisArticle.floor[i].content = marked(thisArticle.floor[i].content,{renderer:floorRenderer,breaks:true});
                        // 日期格式转换
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
