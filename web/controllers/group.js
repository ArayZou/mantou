var mongoose = require('mongoose'),
    _ = require('underscore'),
    Post,
    Group,
    User;
require('../models/user');
require('../models/post');
require('../models/group');
User = mongoose.model('User');
Post = mongoose.model('Post');
Group = mongoose.model('Group');
//群组首页
exports.grouphome = function(req, res) {
    var groupName = req.params.groupname;
    var postArray = [];
    var person = req.session.user;
    var ifUserFollow = false;
    var ifHoster = false;
    Group.find({name:groupName},function(err, thisgroup) {
        if (err) {
            console.log(err);
        }
        if (thisgroup.length>0){
            if(thisgroup[0].hoster == person._id){
                ifHoster = true;
            }
            for(var i = 0;i<person.followgroup.length;i++){
                if(person.followgroup[i] == thisgroup[0]._id){
                    ifUserFollow = true;
                    break;
                }
            }
            Post.find({group:thisgroup[0]._id}).populate({path:'floor.user group'}).exec(function (err, post) {
                if (err) {
                    console.log(err);
                }

                postArray = post;

                res.render('group', {
                    js:[{js:'group'}],
                    title: 'group-'+groupName,
                    groupname: groupName,
                    postArray: postArray,
                    ifUserFollow:ifUserFollow,
                    ifHoster:ifHoster
                });
            })
        }
    });
}
//管理群组页面
exports.groupmanage = function(req, res){
    var groupName = req.params.groupname;
    var person = req.session.user;
    var ifHoster = false;
    Group.find({name:groupName},function(err, thisgroup) {
        if (err) {
            console.log(err);
        }
        if (thisgroup.length>0){
            if(thisgroup[0].hoster == person._id){
                ifHoster = true;

                res.render('groupmanage', {
                    js:[
                        {js:'groupmanage'}
                    ],
                    title: 'group-'+groupName+'管理',
                    thisGroup: thisgroup[0]
                });
            }else{
                res.redirect('/');
            }
        }
    });
}
//创建群组接口
exports.creatgroup = function(req, res) {
    var id = req.session.user._id,
        req_body = req.body;
    if (id) {
        User.findById(id, function(err, user) {
            if (err) {
                console.log(err);
            }
            if (user) {

                Group.find({name: req_body.groupName}, function(err, group) {
                    if (err) {
                        console.log(err);
                    }

                    if (group.length > 0) {
                        res.send({
                            message:'1'
                        });
                    } else {
                        var groupTotal = 0;
                        Group.find(function(err,group){
                            if (err) {
                                console.log(err);
                            }
                            groupTotal = group.length;

                            group = new Group({
                                name: req_body.groupName,
                                groupId: groupTotal + 1,
                                hoster: req.session.user._id,
                                intro: req_body.groupIntro,
                                img:'/img/groupimg.png'
                            });

                            group.save(function(err, group) {
                                if (err) {
                                    console.log(err);
                                }

                                user.followgroup.push(group._id);
                                User.where({ _id: id }).update({$set: { followgroup: user.followgroup }},function(err){
                                    if (err) {
                                        console.log(err);
                                    }
                                    req.session.user = user;

                                    // 关注群组缓存
                                    req.session.group = [];

                                    var followgroupId = [];
                                    for(var i = 0;i<req.session.user.followgroup.length;i++){
                                        followgroupId.push(req.session.user.followgroup[i]);
                                    }
                                    Group.find({_id:{$in:followgroupId}},function(err,group){
                                        if(err){
                                            console.log(err)
                                        }
                                        req.session.group = group;
                                        res.send({
                                            groupname:req_body.groupName
                                        });
                                    })
                                });
                            });
                        });
                    }
                });
            }
        });
    }
}
//群组资料设置接口
exports.editgroupintro = function(req, res) {
    var id = req.session.user._id,
        req_body = req.body;
    if (id) {
        User.findById(id, function(err, user) {
            if (err) {
                console.log(err);
            }
            if (user) {

                Group.find({name: req_body.groupName}, function(err, group) {
                    if (err) {
                        console.log(err);
                    }

                    if (group.length = 1) {
                        group[0].intro = req_body.groupIntro;
                        group[0].link = req_body.groupLink;
                        group[0].weixin = req_body.groupWeixin;
                        group[0].weibo = req_body.groupWeibo;
                        group[0].save(function(err, group) {
                            if (err) {
                                console.log(err);
                            }
                            res.send({
                                success:1
                            });
                        });
                    }
                });
            }
        });
    }
}
// 保存群组图接口
var fs = require('fs'),
    gm = require('gm'),
    imageMagick = gm.subClass({ imageMagick : true });
exports.savegroupimg = function(req, res){
    var id = req.session.user._id,
        req_body = req.body;
    if (id) {
        User.findById(id, function(err, user) {
            if (err) {
                console.log(err);
            }
            if (user) {

                Group.find({name: req_body.groupName}, function(err, group) {
                    if (err) {
                        console.log(err);
                    }

                    if (group.length = 1) {
                        //判断目录是否存在，不存在新建
                        if(!fs.existsSync('web/public/uploads/group')){
                            fs.mkdirSync('web/public/uploads/group');
                        }
                        var req_body = req.body;
                        var imgSrc = req_body.imgSrc;
                        imageMagick(imgSrc)
                            .crop(req_body.imgWidth, req_body.imgHeight, req_body.imgX, req_body.imgY)
                            .resize(100, 100, '!') //加('!')强行把图片缩放成对应尺寸100*100！
                            .write('web/public/uploads/group/'+group[0]._id+'.jpg', function(err){
                                if (err) {
                                    console.log(err);
                                    res.end();
                                }
                                group[0].img = '/uploads/group/'+group[0]._id+'.jpg';
                                group[0].save(function(err, group) {
                                    if (err) {
                                        console.log(err);
                                    }

                                    // 关注群组缓存
                                    req.session.group = [];

                                    var followgroupId = [];
                                    for(var i = 0;i<req.session.user.followgroup.length;i++){
                                        followgroupId.push(req.session.user.followgroup[i]);
                                    }
                                    Group.find({_id:{$in:followgroupId}},function(err,group){
                                        if(err){
                                            console.log(err)
                                        }
                                        req.session.group = group;
                                        res.send({
                                            success:1
                                        });
                                    })
                                });
                            });
                    }
                });
            }
        });
    }
}
