exports.show = function(req, res) {
    var tpl;
    if (!req.session.user) {
        res.redirect('/');
    }
    res.render('msg', {
        js: [{js: 'msg'}],
        title: 'msg'
    });
};


exports.atme = function(req, res) {
    var user = req.session.user;
    if (!user) {
        res.redirect('/');
    }
    //TODO:GET atmes
    res.send({
        success: true,
        data: []
    });
    //TODO end
};

exports.primsg = function(req, res) {
    var user = req.session.user;
    if (!user) {
        res.redirect('/');
    }
    //TODO:GET primsgs
    res.send({
        success: true,
        data: []
    });
    //TODO end
};
