//index页
exports.index = function (req, res, next) {
    // 存DB
    var models = require('../models');
    new models.User({
        userid:'abc',
        password:'123456',
        email:'zrxldl@gmail.com'
    }).save(function(err){
        console.log('new user');
    });
    // 渲染
    res.render('index', {title: 'index'});
}

//home页
exports.home = function (req, res, next) {
    var ifLogin = Math.random()>0.5?true:false;
    // 渲染
    res.render('home', {
        title: 'home',
        ifLogin: ifLogin
    });
}
