const gulp = require('gulp');
const workboxBuild = require('workbox-build');

gulp.task('service-worker', () => {
  return workboxBuild.generateSW({
    globDirectory: 'build',
    globPatterns: [
      '**\/*.{html,json,js,css}',
    ],
    swDest: 'build/sw.js',
  });
});