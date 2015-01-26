module.exports = function(req, res) {
    var tpl;
    if (!req.session.user) {
        res.redirect('/');
    }

    tpl = Handlebars.compile($('#me-tpl').html());;
    $('#mt-container').html(tpl());
}
