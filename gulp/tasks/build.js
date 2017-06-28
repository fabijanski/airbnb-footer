'use strict';

var gulp = require('gulp');
var del = require('del');
var usemin = require('gulp-usemin');
var rev = require('gulp-rev');
var autoprefixer = require('gulp-autoprefixer');
var cleanCss = require('gulp-clean-css');
var browserSync = require('browser-sync').create();


gulp.task('previewDocs', function() {
  browserSync.init({
    notify: false,
    server: {
      baseDir: "docs"
    }
  });
});

gulp.task('deleteDocsFolder', function() {
  return del("./docs");
});

// adding other important files (e.g. CMS) to docs folder
gulp.task('copyGeneralFiles', ['deleteDocsFolder'], function() {
  var pathsToCopy = [
    './app/**/*',
    '!./app/index.html',
    '!./app/assets/scss',
    '!./app/assets/scss/**',
    '!./app/temp',
    '!./app/temp/**'
  ]

  return gulp.src(pathsToCopy)
    .pipe(gulp.dest("./docs"));
});

gulp.task('useminTrigger', ['deleteDocsFolder'], function() {
  gulp.start('usemin');
});

gulp.task('usemin', ['styles'], function() {
  return gulp.src("./app/index.html")
    .pipe(usemin({
      // output the autoprefixed, revisioned & minified version
      css: [function() {return autoprefixer()}, function () {return rev()}, function() {return cleanCss()}]
    }))
    .pipe(gulp.dest("./docs"));
});

gulp.task('build', ['deleteDocsFolder', 'copyGeneralFiles', 'useminTrigger']);
