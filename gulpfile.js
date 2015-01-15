var gulp = require('gulp'),
    server = require('gulp-develop-server'),
    plugins = require('gulp-load-plugins')();

gulp.task('styles', function() {
    return gulp.src('./web/public/scss/*.scss')
        .pipe(plugins.plumber())
        .pipe(plugins.sass())
        // .pipe($.autoprefixer('last 3 version'))
        .pipe(gulp.dest('./web/public/.css/'))
        // .pipe($.size({title: '------------------------- [ Styles ]'}));
});

// run server
gulp.task('server', function() {
    server.listen({path: './web/app.js'});
});

// restart server if app.js changed
gulp.task( 'server:restart', function() {
    gulp.watch(['./web/app.js'], server.restart);
});