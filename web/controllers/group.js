var mongoose = require('mongoose'),
    _ = require('underscore'),
    Post,
    Group;
require('../models/post');
require('../models/group');
Post = mongoose.model('Post');
Group = mongoose.model('Group');
exports.grouphome = function(req, res) {
    var groupName = req.params.groupname;
    var postArray = [];
    var person = req.session.user;
    var ifUserFollow = false;
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
                    ifUserFollow:ifUserFollow
                });
            });
        }
    });
}

exports.creatgroup = function(req, res) {
    var req_body = req.body;

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
                    res.send({
                        groupname:req_body.groupName
                    });
                });
            });
        }
    });
}
