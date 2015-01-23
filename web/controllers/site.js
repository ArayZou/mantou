//index页
exports.index = function (req, res, next) {
    if(req.session.user){
        exports.home(req, res, next);
    }else{
        res.render('index', {title: 'index'});
    }
}

//home页
exports.home = function (req, res, next) {
    // 渲染
    res.render('home', {
        title: 'home'
    });
}
