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
    app: './src/js/app.js',
    vendor: './src/js/vendor/**/*.js',
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


const jsApp = () =>
  gulp
    .src(paths.js.app)
    .pipe(plumber({ errorHandler: onError }))
    .pipe(babel())
    .pipe(minifyJS())
    .pipe(gulp.dest(paths.js.dest));

const jsVendor = () =>
gulp
  .src(paths.js.vendor)
  .pipe(concat('vendor.js'))
  .pipe(plumber({ errorHandler: onError }))
  .pipe(babel())
  .pipe(minifyJS())
  .pipe(gulp.dest(paths.js.dest));

const watcher = () => {
  gulp.watch('./src/scss/**/*.scss', style);
  gulp.watch(paths.js.app, jsApp);
  gulp.watch(paths.js.vendor, jsVendor);
};

const styleWatcher = gulp.series(
  style,
  jsApp,
  jsVendor,
  watcher
);

exports.default = styleWatcher;
