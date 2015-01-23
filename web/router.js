var site = require('./controllers/site'),
    user = require('./controllers/user'),
    json = require('./controllers/json'),
    getimg = require('./controllers/getimg');

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
    // json
    app.get('/json/:jsonfunc', json.index);
    // home
    app.get('/home', site.home);
    // getimg img-placehold
    app.get('/getimg/:size', getimg.index);
};
