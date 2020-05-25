const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const minifyCSS = require('gulp-uglifycss');
const minifyJS = require('gulp-uglify');

const onError = err => console.log(err);

const paths = {
  scss: {
    src: './src/scss/style.scss',
    dest: './dist/assets/css/',
  },
  js: {
    src: './src/js/app.js',
    dest: './dist/assets/js/',
  },
};

const style = () =>
  gulp
    .src(paths.scss.src)
    .pipe(plumber({ errorHandler: onError }))
    .pipe(sass().on('error', onError))
    .pipe(autoprefixer())
    .pipe(minifyCSS())
    .pipe(gulp.dest(paths.scss.dest));


const js = () =>
  gulp
    .src(paths.js.src)
    .pipe(plumber({ errorHandler: onError }))
    .pipe(babel())
    .pipe(minifyJS())
    .pipe(gulp.dest(paths.js.dest));



const watcher = () => {
  gulp.watch('./src/scss/**/*.scss', style);
  gulp.watch(paths.js.src, js);
};

const styleWatcher = gulp.series(
  style,
  js,
  watcher
);

exports.default = styleWatcher;
