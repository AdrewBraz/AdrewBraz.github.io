'use strict';

const gulp = require('gulp');
const less = require('gulp-less');
const prefixer = require('gulp-autoprefixer');
const cleanCss = require('gulp-clean-css');
const rigger = require('gulp-rigger');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const watch = require('gulp-watch');
const browserSync = require('browser-sync');
const newer = require('gulp-newer');
const gulpIf = require('gulp-if');

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

var path = {
    build: {
        html: './',
        js: './js/',
        css: './css/',
        img: './img/'
    },

    src: {
        html: 'src/index.html',
        js: 'src/js/*.js',
        style: 'src/style/main.less',
        img: 'src/img/**/*.*'
    },
    watch: {
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        style: 'src/style/**/*.less',
        img: 'src/img/**/*.*'
    },
};

gulp.task('html:build', function() {
    return gulp.src(path.src.html)
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html));
});

gulp.task('js:build', function() {
    return gulp.src(path.src.js)
        .pipe(gulpIf(isDevelopment, sourcemaps.init()))
        .pipe(gulpIf(isDevelopment, sourcemaps.write()))
        .pipe(gulp.dest(path.build.js))
});

gulp.task("clean:output", function() {
    return gulp.src("build/", { read: false })
        .pipe(clean());
});


gulp.task('fonts', function() {
    return gulp.src('src/fonts/*.*')
        .pipe(gulp.dest('build/fonts/'))
})

gulp.task('style:build', function() {
    return gulp.src(path.src.style)
        .pipe(gulpIf(isDevelopment, sourcemaps.init()))
        .pipe(less())
        .pipe(prefixer())
        .pipe(cleanCss())
        .pipe(gulpIf(isDevelopment, sourcemaps.write()))
        .pipe(gulp.dest(path.build.css))
});

gulp.task('image:build', function() {
    return gulp.src('src/img/**/*.*', { since: gulp.lastRun('image:build') })
        .pipe(newer('build/img/'))
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest('build/img/'))
});


gulp.task('serve', function() {
    browserSync.init({
        server: 'build'
    })
    browserSync.watch('build/**/*.*').on('change', browserSync.reload);
});

gulp.task('build', gulp.parallel('html:build', 'fonts', 'style:build', 'image:build', 'js:build'));

gulp.task('watch', function() {
    gulp.watch(path.src.html, gulp.series('html:build'));
    gulp.watch(path.watch.style, gulp.series('style:build'));
    gulp.watch(path.src.img, gulp.series('image:build'));
    gulp.watch(path.watch.js, gulp.series('js:build'));
});

gulp.task('dev', gulp.series('build', gulp.parallel('watch', 'serve')));