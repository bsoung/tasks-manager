var gulp = require('gulp');
// var sass = require('gulp-sass');
var gp_concat = require('gulp-concat');
var gp_rename = require('gulp-rename');
var gp_uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
// var to5 = require('gulp-6to5');
var path = require('path');

gulp.task('css', function() {	
	return gulp.src(
			[
				'./public/assets/css/main.css',
				'./public/assets/css/sweetalert.css'

			]
		)
		.pipe(minifyCSS())
		.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
		.pipe(gp_concat('style.min.css'))
		.pipe(gulp.dest('./public/build/css'));
});

gulp.task('copy', function() {
	return gulp.src(
			['./public/assets/fonts/**']
		)
		.pipe(gulp.dest('./public/build/fonts'));
});

gulp.task('js', function() {
	return gulp.src(
			[
				'./public/assets/js/jquery.min.js',
				'./public/assets/js/skel.min.js',
				'./public/assets/js/util.js',
				'./public/assets/js/sweetalert.min.js',
				'./public/assets/js/main.js'
			]
		)
		.pipe(gp_concat('gulp-concat.js'))
		.pipe(gulp.dest('./public/min/'))
		.pipe(gp_rename('vendor.min.js'))
		.pipe(gp_uglify())
		.pipe(gulp.dest('./public/build'));
});

gulp.task('watch', function() {
	gulp.watch(['./src/*/**.js', './src/*/*/**.js', './src/*/*/*/**.js'], ['css', 'js']);
});

gulp.task('prod', ['css', 'copy', 'js'], function() {});
gulp.task('default', ['css', 'copy', 'js', 'watch'], function() {});













