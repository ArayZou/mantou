var site = require('./controllers/site'),
    user = require('./controllers/user'),
    json = require('./controllers/json');

module.exports = function(app) {
    app.get('/', site.index);
    //User
    app.post('/user/signup', user.signup);
    app.post('/user/login', user.login);
    // json
    app.get('/json/:jsonfunc', json.index);
    // home
    app.get('/home', site.home);
};
