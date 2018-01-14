var gulp = require('gulp'),
    postcss = require('gulp-postcss'), // post css
    autoprefixer = require('autoprefixer'), // automatic css vendor prefixes
    cssVars = require('postcss-simple-vars'), // css $variables
    cssNested = require('postcss-nested'), // css nested selectors
    cssImport = require('postcss-import'), // css @import
    cssMixins = require('postcss-mixins'); // css @mixins

gulp.task('styles', function() {
  //async functions must use return statement
  return gulp.src('./app/assets/styles/styles.css') //main file with all @import
    //array of packages, ORDER MATTERS
    .pipe(postcss([cssImport, cssMixins, cssVars, cssNested, autoprefixer]))
    //handles error gracefully and prevents "watch" task to stop
    .on('error', function(err) {
      console.log(err.toString()); // print error in readable format
      this.emit('end'); // end task, but keeps "watch" task going
    })
     // put everything in named folder, file name is same as src
    .pipe(gulp.dest('./app/temp/styles'));
});
