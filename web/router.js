var site = require('./controllers/site'),
    user = require('./controllers/user'),
    me = require('./controllers/me'),
    group = require('./controllers/group'),
    post = require('./controllers/post'),
    article = require('./controllers/article'),
    find = require('./controllers/find'),
    myfollows = require('./controllers/myfollows'),
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
    app.post('/user/repwd', user.repwd);
    app.post('/user/info', user.info);
    app.post('/user/followgroup', user.followgroup);
    // home
    app.get('/home', site.home);
    //me
    app.get('/me', me.show);
    app.get('/me/collect', me.col);
    app.get('/me/pub', me.pub);
    app.get('/me/setting/:type', me.setting);
    //group
    app.get('/group/:groupname', group.grouphome);
    app.get('/group/:groupname/manage', group.groupmanage);
    app.post('/group/creatgroup', group.creatgroup);
    app.post('/group/editgroupintro', group.editgroupintro);
    //article
    app.get('/group/:groupname/:articleid', article);
    //post
    app.post('/post/write', post.write);
    //find
    app.get('/findgroup', find.findgroup);
    app.get('/findarticle', find.findarticle);
    //myfollows
    app.get('/myfollows', myfollows);


    // json
    app.get('/json/:jsonfunc', json.index);
};
