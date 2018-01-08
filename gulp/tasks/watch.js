var gulp = require('gulp'),
    watch = require('gulp-watch'),
    browserSync = require('browser-sync').create(); //import only "create" method

// compiles css in temp folder and inject css in page automatically
// 'taskName', ['taskName' dependencies], function() {tasks}
gulp.task('cssInject', ['styles'], function() {
  return gulp.src('./app/temp/styles/styles.css')
    .pipe(browserSync.stream());
});

// watches for changes in files and runs tasks accordingly
gulp.task('watch', function() {

  // require browser-sync: creates a webserver that serves website in "baseDir"
  browserSync.init({
    notify: false, //turns off notifications
    server: {
      baseDir: "app"
    }
  })

  //reloads browser when index.html is modified
  watch('./app/index.html', function() {
    browserSync.reload();
  });

  // requres gulp-watch: 'filePath', function() { tasks }
  // ** = all subfolders, * = any .css file
  watch('./app/assets/styles/**/*.css', function() {
    gulp.start('cssInject');
  });

});
