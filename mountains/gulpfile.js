'use strict';

const gulp = require('gulp');
const scss = require('gulp-sass');
const prefixer = require('gulp-autoprefixer');
const cleanCss = require('gulp-clean-css');
const rigger = require('gulp-rigger');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const watch = require('gulp-watch');
const svgSprite = require('gulp-svg-sprite');
const replace = require('gulp-replace');
const cheerio = require('gulp-cheerio');
const svgMin = require('gulp-svgmin');
const browserSync = require('browser-sync');
const newer = require('gulp-newer');

var path = {
    build: { //Тут мы укажем куда складывать готовые после сборки файлы
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/img/',
        svg: 'build/'
    },
  
    src: { //Пути откуда брать исходники
        html: 'src/index.html', //Синтаксис src/*.html говорит gulp что мы хотим взять все файлы с расширением .html
        js: 'src/js/*.js',//В стилях и скриптах нам понадобятся только main файлы
        style: 'src/style/style.scss',
        img: 'src/img/**/*.*', //Синтаксис img/**/*.* означает - взять все файлы всех расширений из папки и из вложенных каталогов
        svg: 'src/img/**/*.svg'
    },
    watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        style: 'src/style/**/*.scss',
        img: 'src/img/**/*.*',
        icons: 'src/img/**/*.svg'
    },
};

gulp.task('html:build', function () {
 return gulp.src(path.src.html)
        .pipe(rigger()) 
        .pipe(gulp.dest(path.build.html)); 
});

gulp.task('js:build', function () {
  return  gulp.src(path.src.js) 
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.js))
});

gulp.task("clean:output", function() {
  return gulp.src("build/", {read: false})
    .pipe(clean());
});


gulp.task('fonts', function(){
  return gulp.src('src/fonts/*.*')
         .pipe(gulp.dest('build/fonts/'))
})

gulp.task('style:build', function () {
   return gulp.src(path.src.style)
        .pipe(scss())
        .pipe(prefixer()) 
        .pipe(cleanCss()) 
        .pipe(gulp.dest(path.build.css)) //И в build
});

gulp.task('image:build', function () {
   return gulp.src('src/img/**/*.*', {since: gulp.lastRun('image:build')}) 
        .pipe(newer('build/img/'))
        .pipe(imagemin({ //Сожмем их
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest('build/img/')) //И бросим в build
});

gulp.task('svg:build', function(){
  return gulp.src(path.src.svg)
  
          .pipe(svgMin({
			 js2svg: {
				pretty: true
			 }
          }))
  
		  .pipe(cheerio({
			run: function ($) {
		      $('[fill]').removeAttr('fill');
		      $('[style]').removeAttr('style');
			},
			parserOptions: { xmlMode: true }
		  }))
  
		 .pipe(replace('&gt;', '>'))
     
         .pipe(svgSprite({
            svg: {
              dimensionAttributes: false
            },
            mode:{
              symbol:{
                dest: '.',
                prefix: '$',
                sprite: 'sprite.symbol.svg',
                layout: 'vertical',
                dimensions: true,
                bast: false,
                render:{
                  css: false,
                  styl: false
                },
                example: true
              }
              
            }
          }))
         .pipe(gulp.dest(path.build.svg))
});

gulp.task('serve', function(){
  browserSync.init({
    server: 'build'
  })
  browserSync.watch('build/**/*.*').on('change', browserSync.reload);
});

gulp.task('build', gulp.parallel('html:build','fonts','style:build','image:build','js:build' ));  
  
gulp.task('watch', function(){
  gulp.watch(path.src.html, gulp.series('html:build'));
  gulp.watch(path.watch.style, gulp.series('style:build'));
  gulp.watch(path.src.img, gulp.series('image:build'));
  gulp.watch(path.watch.js, gulp.series('js:build'));
});

gulp.task('dev', gulp.series('build', gulp.parallel('watch', 'serve')));