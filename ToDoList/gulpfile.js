'use strict';

const gulp = require('gulp');
const styl = require('gulp-stylus');
const prefixer = require('gulp-autoprefixer')
const cleanCss = require('gulp-clean-css');
const rigger = require('gulp-rigger');
const sourcemaps = require('gulp-sourcemaps');
const watch = require('gulp-watch');
const browserSync = require('browser-sync');
const uglify = require('gulp-uglify');
const debug = require('gulp-debug');

gulp.task('html:build', function () {
 return gulp.src('src/index.html')
        .pipe(rigger())
        .pipe(gulp.dest('build/'));
});

gulp.task('js:build', function () {
  return  gulp.src('src/js/**/*.*')
        .pipe(rigger())
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write()) 
        .pipe(gulp.dest('build/js/'))
});

gulp.task('style:build', function () {
   return gulp.src('src/**/*.styl')
        .pipe(debug())
        .pipe(sourcemaps.init())
        .pipe(debug())
        .pipe(styl())
        .pipe(debug())
        .pipe(prefixer())
        .pipe(debug())
        .pipe(cleanCss())
        .pipe(sourcemaps.write())
        .pipe(debug())
        .pipe(gulp.dest('build/')) //И в build
});

gulp.task('serve', function(){
  browserSync.init({
    server: 'build'
  })
  browserSync.watch('build/**/*.*').on('change', browserSync.reload);
});

gulp.task('build', gulp.parallel('html:build','style:build','js:build' ));  
  
gulp.task('watch', function(){
  gulp.watch('src/index.html', gulp.series('html:build'));
  gulp.watch('src/styles/style.styl', gulp.series('style:build'));
  gulp.watch('src/js/*.js', gulp.series('js:build'));
});

gulp.task('dev', gulp.series('build', gulp.parallel('watch', 'serve')));