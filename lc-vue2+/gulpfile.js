var webpackConfig = require('./webpack.config.js');
var gulp = require('gulp');
var webpack = require("webpack");
gulp.task("webpack", function(callback) {
  var myConfig = Object.create(webpackConfig);
  webpack(myConfig, function(err, stats) {
      callback();
    });
});
// gulp.task('watchVue',function(){
//   gulp.watch(['resource/js/**/*.vue','resource/js/**/*.js'], ['webpack']);
// });
