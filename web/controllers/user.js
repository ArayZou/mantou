var mongoose = require('mongoose'),
    User;
require('../models/user');
User = mongoose.model('User');
//注册
exports.signup = function(req, res) {
    var req_body = req.body;

    User.find({name: req_body.name}, function(err, user) {
        if (err) {
            console.log(err);
        }
        if (user) {
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
                res.redirect('/');
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
        if (!user) {console.log(11)
            return res.redirect('/');
        }
        user.pwdMatch(pwd, function(err, isMatch) {
            if (err) {
                console.log(err);
            }
            if (isMatch) {
                req.session.user = user;
            }
            return res.redirect('/');
        });
    });
};

//登出
exports.logout = function(req, res) {
    delete req.session.user;
    res.redirect('/');
};