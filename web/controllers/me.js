//show page me
exports.show = function(req, res) {
    var tpl;
    if (!req.session.user) {
        res.redirect('/');
    }
    res.render('me', {
        js:[{js:'me'}],
        title: 'me'
    });
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
};

exports.setting = function(req, res) {
    var type = req.params.type;
    switch (type) {
        case 'photo':
            break;
        case 'info':
            break;
        case 'psw':
            break;
    }
    res.send({
        success: true,
        data: []
    });
};
