'use strict';

var gulp = require('gulp');
var watch = require('gulp-watch');
var browserSync = require('browser-sync').create();

gulp.task('watch', function() {

  browserSync.init({
    notify: false,
    server: {
      baseDir: "app"
    }
  });

  watch('./app/index.html', function() {
    browserSync.reload();
  });
  // watch for stylesheets changes
  watch('./app/assets/scss/**/*.scss', function() {
    gulp.start('cssInject');
  });

  // watch for scripts changes
  watch('./app/assets/scripts/**/*.js', function() {
    gulp.start('scriptsRefresh');
  });

});

gulp.task('cssInject', ['styles'], function() {
  return gulp.src('./app/temp/css/styles.css')
    .pipe(browserSync.stream());
});

gulp.task('scriptsRefresh', ['scripts'], function() {
  browserSync.reload();
});
