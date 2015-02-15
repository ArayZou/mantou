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
    for(var i = 0;i<person.followgroup.length;i++){
        if(person.followgroup[i].name == groupName){
            ifUserFollow = true;
            break;
        }
    }
    Group.find({name:groupName},function(err, thisgroup) {
        if (err) {
            console.log(err);
        }
        if (thisgroup.length>0){
            if(thisgroup[0].hoster == person._id){
                ifHoster = true;
            }
            Post.find({group:thisgroup[0]._id}, function(err, post) {
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
            });
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
                        {js:'group'}
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
                                intro: req_body.groupIntro
                            });

                            group.save(function(err, group) {
                                if (err) {
                                    console.log(err);
                                }

                                user.followgroup.push({name:req_body.groupName});
                                User.where({ _id: id }).update({$set: { followgroup: user.followgroup }},function(err){
                                    if (err) {
                                        console.log(err);
                                    }
                                    req.session.user = user;

                                    res.send({
                                        groupname:req_body.groupName
                                    });
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
                        console.log(req_body.groupIntro)
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
