var gulp = require('gulp'),
    server = require('gulp-develop-server'),
    plugins = require('gulp-load-plugins')();

// 启动
gulp.task('default', ['server','styles'], function() {
    gulp.watch('./web/public/scss/*.scss', ['styles']);
});

// watch sass change & compile
gulp.task('styles', function() {
    gulp.src('./web/public/scss/*.scss')
        .pipe(plugins.plumber())
        .pipe(plugins.sass())
        .pipe(gulp.dest('./web/public/.css/'));
});

// start express server
gulp.task('server', function() {
    server.listen({path: './web/app.js'});
});

// restart server if app.js changed
gulp.task('server:restart', function() {
    gulp.watch(['./web/app.js'], server.restart);
});

