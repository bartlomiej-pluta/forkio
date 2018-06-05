var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var svgmin = require('gulp-svgmin');
var changed = require('gulp-changed');
var htmlReplace = require('gulp-html-replace');
var htmlMin = require('gulp-htmlmin');
var del = require('del');
var sequence = require('run-sequence');

var config = {
  dist: 'out/',
  src: 'src/',

  cssIn: 'src/css/**/*.css',
  jsIn: 'src/js/**/*.js',
  imgIn: 'src/img/**/*.{jpg,jpeg,png,gif}',
  svgIn: 'src/img/**/*.svg',
  htmlIn: 'src/*.html',
  scssIn: 'src/scss/**/*.scss',

  cssOut: 'out/css/',
  jsOut: 'out/js/',
  imgOut: 'out/img/',
  htmlOut: 'out/',
  scssOut: 'src/css/',
  cssOutName: 'style.css',
  jsOutName: 'script.js',
  cssReplaceOut: 'css/style.css',
  jsReplaceOut: 'js/script.js'
};

gulp.task('reload', function() {
  browserSync.reload();
});

gulp.task('serve', function() {
  browserSync({
    server: config.dist
  });

  gulp.watch(config.htmlIn, function() { sequence('html', 'reload') });
  gulp.watch(config.scssIn, function() { sequence('sass', 'css' ) });
  gulp.watch(config.jsIn, function() { sequence('js', 'reload') });
  gulp.watch(config.imgIn, function() { sequence('img', 'reload') });
  gulp.watch(config.svgIn, function() { sequence('svg', 'reload') });
});

gulp.task('sass', function() {
  return gulp.src(config.scssIn)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 3 versions']
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.scssOut))
    .pipe(browserSync.stream());
});

gulp.task('css', function() {
  return gulp.src(config.cssIn)
    .pipe(concat(config.cssOutName))
    .pipe(cleanCSS())
    .pipe(gulp.dest(config.cssOut));
});

gulp.task('js', function() {
  return gulp.src(config.jsIn)
    .pipe(concat(config.jsOutName))
    .pipe(uglify())
    .pipe(gulp.dest(config.jsOut));
});

gulp.task('img', function() {
  return gulp.src(config.imgIn)
    .pipe(changed(config.imgOut))
    .pipe(imagemin())
    .pipe(gulp.dest(config.imgOut));
});

gulp.task('svg', function() {
  return gulp.src(config.svgIn)
    .pipe(changed(config.imgOut))
    .pipe(svgmin())
    .pipe(gulp.dest(config.imgOut));
});

gulp.task('html', function() {
  return gulp.src(config.htmlIn)
    .pipe(htmlReplace({
      'css': config.cssReplaceOut,
      'js': config.jsReplaceOut
    }))
    .pipe(htmlMin({
      sortAttributes: true,
      sortClassName: true,
      collapseWhitespace: true
    }))
    .pipe(gulp.dest(config.htmlOut))
});

gulp.task('clean', function() {
  return del([config.dist]);
});

gulp.task('build', function() {
  sequence('clean', 'sass', ['html', 'js', 'css', 'img', 'svg']);
});

gulp.task('default', sequence('build', 'serve'));
