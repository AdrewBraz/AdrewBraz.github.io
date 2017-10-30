'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
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
const gulpIf = require('gulp-if');

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

var path = {
    build: {
        html: 'build/',
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
        .pipe(gulp.dest('./build/fonts/'))
})

gulp.task('style:build', function() {
    return gulp.src(path.src.style)
        .pipe(gulpIf(isDevelopment, sourcemaps.init()))
        .pipe(sass())
        .pipe(prefixer())
        .pipe(cleanCss())
        .pipe(gulpIf(isDevelopment, sourcemaps.write()))
        .pipe(gulp.dest(path.build.css))
});

gulp.task('image:build', function() {
    return gulp.src('src/img/**/*.*', { since: gulp.lastRun('image:build') })
        .pipe(newer('./img/'))
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest('./build/img/'))
});

gulp.task('svg:build', function() {
    return gulp.src(path.src.svg)
        .pipe(svgSprite({
            svg: {
                dimensionAttributes: false
            },
            mode: {
                symbol: {
                    dest: '.',
                    prefix: '$',
                    sprite: 'sprite.mountains.svg',
                    layout: 'vertical',
                    dimensions: true,
                    bast: false,
                    render: {
                        css: false,
                        styl: false
                    },
                    example: true
                }

            }
        }))
        .pipe(gulp.dest(path.build.svg))
});

gulp.task('serve', function() {
    browserSync.init({
        server: './build'
    })
    browserSync.watch('build/**/*.*').on('change', browserSync.reload);
});

gulp.task('build', gulp.parallel('html:build', 'fonts', 'style:build', 'image:build', 'js:build', 'svg:build'));

gulp.task('watch', function() {
    gulp.watch(path.src.html, gulp.series('html:build'));
    gulp.watch(path.watch.style, gulp.series('style:build'));
    gulp.watch(path.src.img, gulp.series('image:build'));
    gulp.watch(path.watch.js, gulp.series('js:build'));
});

gulp.task('dev', gulp.series('build', gulp.parallel('watch', 'serve')));