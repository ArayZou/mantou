var site = require('./controllers/site'),
    user = require('./controllers/user'),
    me = require('./controllers/me'),
    json = require('./controllers/json');

module.exports = function(app) {
    //pre handler user
    app.use(function(req, res, next) {
        var _ = req.session.user;
        app.locals.user = _;
        next();
    });
    app.get('/', site.index);
    //User
    app.post('/user/signup', user.signup);
    app.post('/user/login', user.login);
    app.post('/user/logout', user.logout);
    // json
    app.get('/json/:jsonfunc', json.index);
    // home
    app.get('/home', site.home);
    //me
    app.get('/me', me);
};
