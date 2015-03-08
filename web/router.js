var site = require('./controllers/site'),
    user = require('./controllers/user'),
    me = require('./controllers/me'),
    msg = require('./controllers/msg'),
    group = require('./controllers/group'),
    post = require('./controllers/post'),
    article = require('./controllers/article'),
    find = require('./controllers/find'),
    myfollows = require('./controllers/myfollows'),
    auth = require('./middlewares/auth'),
    json = require('./controllers/json');

module.exports = function(app) {
    //pre handler user
    app.use(function(req, res, next) {
        app.locals.user = req.session.user;
        app.locals.group = req.session.group;
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
    app.post('/user/saveuserimg', user.saveuserimg);
    // home
    app.get('/home', auth, site.home);
    //me
    app.get('/me', auth,  me.show);
    app.get('/me/collect', auth,  me.col);
    app.get('/me/pub', auth,  me.pub);
    app.get('/me/setting/:type', auth,  me.setting);
    //message
    app.get('/msg', auth, msg.show);
    app.get('/msg/atme', auth, msg.atme);
    app.get('/msg/primsg', auth, msg.primsg);
    //group
    app.get('/group/:groupname', auth,  group.grouphome);
    app.get('/group/:groupname/manage', auth,  group.groupmanage);
    app.get('/group/:groupname/about', group.groupabout);
    app.post('/group/creatgroup', group.creatgroup);
    app.post('/group/editgroupintro', group.editgroupintro);
    app.post('/group/savegroupimg',group.savegroupimg);
    //article
    app.get('/group/:groupname/:articleid', auth, article);
    //post
    app.post('/post/write', post.write);
    app.post('/post/reply', post.reply);
    //find
    app.get('/findgroup', auth,  find.findgroup);
    app.get('/findarticle', auth,  find.findarticle);
    //myfollows
    app.get('/myfollows', auth,  myfollows);

    // json
    app.use('/json/uploadimg',json.uploadimg);
};
