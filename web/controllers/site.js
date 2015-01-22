//index页
exports.index = function (req, res, next) {
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
