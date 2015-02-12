var mongoose = require('mongoose'),
    _ = require('underscore'),
    User,
    Group;
require('../models/user');
require('../models/group');
User = mongoose.model('User');
Group = mongoose.model('Group');
//注册
exports.signup = function(req, res) {
    var req_body = req.body;

    User.find({name: req_body.name}, function(err, user) {
        if (err) {
            console.log(err);
        }

        if (user.length > 0) {
            return res.redirect('/');
        } else {
            user = new User({
                name: req_body.name,
                password: req_body.password
            });

            user.save(function(err, user) {
                if (err) {
                    console.log(err);
                }
                req.session.user = user;
                res.redirect('/home');
            });
        }
    });
};

//登录
exports.login = function(req, res) {
    var req_body = req.body,
        name = req_body.name,
        pwd = req_body.password;
    User.findOne({name: name}, function(err, user) {
        if (err) {
            console.log(err);
        }
        if (!user) {
            return res.redirect('/');
        }

        user.pwdMatch(pwd, function(err, isMatch) {
            if (err) {
                console.log(err);
            }

            if (isMatch) {
                req.session.user = user;
                console.log(req.session)
            }
            return res.redirect('/home');
        });
    });
};

//登出
exports.logout = function(req, res) {
    delete req.session.user;
    res.redirect('/');
};

//修改密码
exports.repwd = function(req, res) {
    var id = req.session.user._id;
    if (id) {
        User.findById(id, function(err, user) {
            if (err) {
                console.log(err);
            }
            if (user) {
                user.pwdMatch(req.body.oldPwd, function(err, isMatch) {
                    if (err) {
                        console.log(err);
                    }
                    if (isMatch) {
                        user = _.extend(user, {password: req.body.newPwd});
                        user.save(function(err, _user) {
                            if (err) {
                                console.log(err);
                            }
                            req.session.user = _user;
                            res.send({
                                success: true,
                            });
                        });
                    } else {
                        res.send({
                            success: false,
                            err: '密码不正确'
                        });
                    }
                });
            }
        });
    }
};

//基本信息
exports.info = function(req, res) {
    var id = req.session.user._id,
        reqBody = req.body;
    if (id) {
        User.findById(id, function(err, user) {
            if (err) {
                console.log(err);
            }
            if (user) {
                user = _.extend(user, {
                    realname: reqBody.realName,
                    weibo: reqBody.weibo,
                    qq: reqBody.qq,
                    sign: reqBody.sign
                });
                user.save(function(err, _user) {
                    if (err) {
                        console.log(err);
                    }
                    req.session.user = _user;
                    res.send({
                        success: true
                    });
                });
            }
        });
    }
};

//关注群组
exports.followgroup = function(req, res) {
    var id = req.session.user._id,
        reqBody = req.body;
    var ifFollow = true;
    if (id) {
        User.findById(id, function(err, user) {
            if (err) {
                console.log(err);
            }
            if (user) {
                Group.find({name:reqBody.groupName},function(err,group){
                    if (err) {
                        console.log(err);
                    }
                    if(user.followgroup.length >0){
                        for(var i = 0;i<user.followgroup.length;i++){
                            if(String(user.followgroup[i].name)==String(group[0].name)){
                                Array.remove(user.followgroup,i);
                                User.where({ _id: id }).update({$set: { followgroup: user.followgroup }},function(err){
                                    if (err) {
                                        console.log(err);
                                    }
                                    req.session.user = user;
                                    res.send({
                                        success:2
                                    });
                                });
                                ifFollow = false;
                                break;
                            }
                        }
                    }
                    if(ifFollow){
                        user.followgroup.push({name:group[0].name});
                        User.where({ _id: id }).update({$set: { followgroup: user.followgroup }},function(err){
                            if (err) {
                                console.log(err);
                            }
                            req.session.user = user;
                            res.send({
                                success:1
                            });
                        });
                    }
                });
            }
        });
    }else{
        res.send({
            error:1
        });
    }
};


Array.remove = function(array, from, to) {
    var rest = array.slice((to || from) + 1 || array.length);
    array.length = from < 0 ? array.length + from : from;
    return array.push.apply(array, rest);
};
