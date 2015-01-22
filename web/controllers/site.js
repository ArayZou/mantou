exports.index = function (req, res, next) {
    // 渲染
    res.render('index', {title: 'index'});
}
