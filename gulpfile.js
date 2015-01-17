var gulp = require('gulp'),
    server = require('gulp-develop-server'),
    minifyCSS = require('gulp-minify-css'),
    concat = require('gulp-concat'),        // 合并文件
    rename = require('gulp-rename'),        // 重命名
    plugins = require('gulp-load-plugins')();

// 启动
gulp.task('default', ['server','styles'], function() {
    gulp.watch('./web/public/scss/*.scss', ['build-sass']);
    gulp.watch('./web/public/css/*.css', ['styles']);
});

// watch sass change & compile
gulp.task('build-sass', function() {
    gulp.src('./web/public/scss/*.scss')
        .pipe(plugins.plumber())
        .pipe(plugins.sass())
        .pipe(gulp.dest('./web/public/css/'));
});

gulp.task('styles',['build-sass'], function() {
  gulp.src('./web/public/css/*.css')
    .pipe(concat('all.css'))
    .pipe(gulp.dest('./web/public/css/'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifyCSS({keepBreaks:true}))
    .pipe(gulp.dest('./web/public/dist/'))
});

// start express server
gulp.task('server', function() {
    server.listen({path: './web/app.js'});
});

// restart server if app.js changed
gulp.task('server:restart', function() {
    gulp.watch(['./web/app.js'], server.restart);
});

