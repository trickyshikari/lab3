var gulp = require('gulp');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var autoPrefixer = require('gulp-autoprefixer');
//if node version is lower than v.0.1.2
require('es6-promise').polyfill();
var cssComb = require('gulp-csscomb');
var cmq = require('gulp-merge-media-queries');
var cleanCss = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var jade = require('gulp-jade');
gulp.task('sass',function(){
    gulp.src(['src/sass//**/*.sass'])
        .pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(sass())
        .pipe(autoPrefixer())
        .pipe(cssComb())
        .pipe(cmq({log:true}))
        .pipe(gulp.dest('src/css/'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(cleanCss())
        .pipe(gulp.dest('src/css/'))
});
gulp.task('js',function(){
    gulp.src(['src/js/src/**/*.js'])
        .pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(gulp.dest('src/js/dist'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(gulp.dest('src/js/dist'))
});
gulp.task('jade',function(){
    gulp.src(['src/views//**/*.jade'])
        .pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(jade())
        .pipe(gulp.dest('{htmlDest}'))
});
gulp.task('default',function(){
    gulp.watch('src/js/src/**/*.js', gulp.series('js'));
    gulp.watch('src/sass//**/*.sass', gulp.series('sass'));
    gulp.watch('src/views//**/*.jade', gulp.series('jade'));
});