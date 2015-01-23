var express = require('express'),
    path = require('path'),
    mongoose = require('mongoose'),
    session = require('express-session'),
    mongoStore = require('connect-mongo')(session),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    app = express(),
    hbs = require('hbs'),
    mongoUrl = 'mongodb://localhost/mantou';

mongoose.connect(mongoUrl)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// hbs partials
// use: {{> footer }}
hbs.registerPartials(__dirname + '/views/partials');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'mantou',
    store: new mongoStore({
        url: mongoUrl,
        collections: 'sessions'
    })
}));

//router
require('./router')(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;

//server
app.listen(3000, function () {
    console.log('server')
});
