const gulp = require('gulp');
// LESS
const less = require('gulp-less');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('autoprefixer');
var watch_less = require('gulp-watch-less2');

const file_path = {
  less: './src/**/style-*.less',
  img: './src/img/**/*',
  pub_css: './dist'
};

gulp.task('watch_less', function() {
  return gulp.src(file_path.less)
    .pipe(watch_less(file_path.less, {
      verbose: true
    }))
    // less sourcemap, for debugging
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist'));
});

gulp.task('default', ['watch_less']);