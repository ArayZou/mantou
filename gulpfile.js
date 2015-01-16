var gulp = require('gulp'),
    watch = require('gulp-watch'),
    server = require('gulp-develop-server'),
    plugins = require('gulp-load-plugins')();

gulp.task('default', ['server'], function() {
    //watch sass change & compile
    gulp.src('./web/public/scss/*.scss')
        .pipe(watch('./web/public/scss/*.scss'))
        .pipe(plugins.sass())
        .pipe(gulp.dest('./web/public/.css/'));
});

//start server
gulp.task('server', function() {
    server.listen({path: './web/app.js'});
});

// restart server if app.js changed
gulp.task('server:restart', function() {
    gulp.watch(['./web/app.js'], server.restart);
});