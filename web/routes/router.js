module.exports = function(app) {
    app.get('/', function(req, res, next) {
        res.render('index', {title: 'mantou_index'});
    });
    app.get('/user', function(req, res, next) {
        res.send('respond with a resource');
    });
}
