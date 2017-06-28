'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');

var config = {
   srcScss : './app/assets/scss/styles.scss',
   buildCss: './app/temp/css'
}

gulp.task('styles', ['scss-sourcemap'], function() {
  gulp.src(config.srcScss)
    // output non-minified & autoprefixed CSS file
    .pipe(sass({
       outputStyle : 'expanded'
    }).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest(config.buildCss));
});

gulp.task('scss-sourcemap', function() {
  return gulp.src(config.srcScss)
    // create sourcemap for main scss file
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write('/'))
    .pipe(gulp.dest(config.buildCss));
});
