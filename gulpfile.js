var gulp = require('gulp'),
	uglify= require('gulp-uglify');


gulp.task('default', ['scripts', 'styles']);


gulp.task('scripts', function  () {
	gulp.src('js/*.js')
	.pipe(uglify())
	.pipe(gulp.dest('build/js'));
})
gulp.task('styles', function  () {
	console.log('styles');
})

