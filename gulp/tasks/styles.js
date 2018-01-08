var gulp = require('gulp'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    cssVars = require('postcss-simple-vars'),
    cssNested = require('postcss-nested'),
    cssImport = require('postcss-import'),
    cssMixins = require('postcss-mixins');

gulp.task('styles', function() {
  //async functions must use return statement
  return gulp.src('./app/assets/styles/styles.css') //main file with all @import
    .pipe(postcss([cssImport, cssMixins, cssVars, cssNested, autoprefixer])) //array of packages, ORDER MATTERS
    .on('error', function(err) { //handles error gracefully and prevents "watch" task to stop
      console.log(err.toString()); // print error in readable format
      this.emit('end'); // end task, but keeps "watch" task going
    })
    .pipe(gulp.dest('./app/temp/styles')); // put everything in named folder, file name is same as src
});
