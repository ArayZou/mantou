module.exports = function(req, res) {
    var tpl;
    if (!req.session.user) {
        res.redirect('/');
    }
    res.render('me', {title: 'me'});
}
