const gulp = require('gulp');
const sass = require('gulp-sass');
const nodemon = require('gulp-nodemon');
const minifyCSS = require('gulp-minify-css');

gulp.task('default', ['sass:watch', 'sass', 'startNodemon']);
 
gulp.task('sass', function () {
  return gulp.src('./public/scss/app.scss')
    .pipe(sass({outputStyle: 'compress'}).on('error', sass.logError))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('sass:watch', function () {
    gulp.watch('./public/scss/**/*.scss', ['sass']);
});

gulp.task('startNodemon', function () {
    nodemon({
      script: 'app.js'
    , ext: 'js pug'
    , env: { 'NODE_ENV': 'development' }
    })
});

