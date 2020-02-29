var gulp = require("gulp");
var flatten = require('gulp-flatten');
var tsc = require('gulp-typescript');
var flattenImports = require('gulp-flatten-imports');

gulp.task("default", function () {
   gulp.src('./scripts/**/*.ts')
      .pipe(tsc({
         lib:[]
      }))    
      .pipe(flatten())
      .pipe(gulp.dest('a')); 

      gulp.src('./a/**/*.js')
      .pipe(flattenImports())
      .pipe(gulp.dest('b')); 


})