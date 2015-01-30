//show page me
exports.show = function(req, res) {
    var tpl;
    if (!req.session.user) {
        res.redirect('/');
    }
    res.render('me', {title: 'me'});
};

//get collections
exports.col = function(req, res) {
    var user = req.session.user;
    if (!user) {
        res.redirect('/');
    }
    //TODO:GET collections of user
    res.send({
        success: true,
        data: []
    });
    //TODO end
};

//get pubs
exports.pub = function(req, res) {
    var user = req.session.user;
    if (!user) {
        res.redirect('/');
    }
    //TODO:GET pubs of user
    res.send({
        success: true,
        data: []
    });
    //TODO end
}