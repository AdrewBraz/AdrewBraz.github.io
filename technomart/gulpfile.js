'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const prefixer = require('gulp-autoprefixer');
const cleanCss = require('gulp-clean-css');
const rigger = require('gulp-rigger');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const sourcemaps = require('gulp-sourcemaps');
const watch = require('gulp-watch');
const svgSprite = require('gulp-svg-sprite');
const browserSync = require('browser-sync');
const newer = require('gulp-newer');

var path = {
    build: { 
        html: ,
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/img/',
        svg: 'build/'
    },
  
    src: { 
        html: 'src/index.html', 
        js: 'src/js/*.js',
        style: 'src/style/style.scss',
        img: 'src/img/**/*.*',
        svg: 'src/img/**/*.svg'
    },
    watch: {
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        style: 'src/style/**/*.scss',
        img: 'src/img/**/*.*',
        icons: 'src/img/**/*.svg'
    },
};

gulp.task('html:build', function () {
 return gulp.src(path.src.html)//Выберем файлы по нужному пути
        .pipe(rigger()) //Прогоним через rigger
        .pipe(gulp.dest('Pink/')); //Выплюнем их в папку build
});

gulp.task('js:build', function () {
  return  gulp.src(path.src.js) //Найдем наш main файл
        .pipe(rigger()) //Прогоним через rigger
        .pipe(sourcemaps.init()) //Инициализируем sourcemap//Сожмем наш js
        .pipe(sourcemaps.write()) //Пропишем карты
        .pipe(gulp.dest(path.build.js)) //Выплюнем готовый файл в build
});

gulp.task("clean:output", function() {
  return gulp.src("build/", {read: false})
    .pipe(clean());
});


gulp.task('style:build', function () {
   return gulp.src(path.src.style) //Выберем наш main.scss
        .pipe(sourcemaps.init()) //То же самое что и с js
        .pipe(sass()) //Скомпилируем
        .pipe(prefixer()) //Добавим вендорные префиксы
        .pipe(cleanCss()) //Сожмем
        .pipe(sourcemaps.write())
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

gulp.task('build', gulp.parallel('html:build','style:build','image:build','js:build' ));  
  
gulp.task('watch', function(){
  gulp.watch(path.src.html, gulp.series('html:build'));
  gulp.watch(path.watch.style, gulp.series('style:build'));
  gulp.watch(path.src.img, gulp.series('image:build'));
  gulp.watch(path.watch.js, gulp.series('js:build'));
});

gulp.task('dev', gulp.series('build', gulp.parallel('watch', 'serve')));