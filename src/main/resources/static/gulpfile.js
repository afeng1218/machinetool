var gulp = require('gulp');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var concat = require('gulp-concat');
var replace = require('gulp-replace');
var copy = require('gulp-copy');
var clean = require('gulp-clean');

gulp.task('default', ['replace'], function() {
	return gulp.src('./dist')
		.pipe(clean());
});

//移动原文件
gulp.task('copy', function() {
	return gulp.src(['./js/**/*.js', './css/**/*.css'])
		.pipe(copy('./dist'));
});
//JS压缩
gulp.task('uglify', ['copy'], function() {
	return gulp.src('./dist/js/**/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('./js'));
});
//通用JS合成
gulp.task('concatCommonJs', ['uglify'], function() {
	return gulp.src(['./js/jquery.min.js', './js/jquery.cookie.js', './js/jquery.script.js', './js/jquery.form.js', './js/jquery.base64.js', './js/bootstrap.min.js', './js/config.js', './js/common.js', './js/Math.uuid.js'])
		.pipe(concat('common.concat.js'))
		.pipe(gulp.dest('./js'));
});
//控件JS合成
gulp.task('concatWidgetJs', ['uglify'], function() {
	return gulp.src(['./js/date-range.js', './js/page.js', './js/radio.js', './js/select.js'])
		.pipe(concat('widget.concat.js'))
		.pipe(gulp.dest('./js'));
});
//CSS压缩
gulp.task('minifyCss', ['copy'], function() {
	return gulp.src('./dist/css/**/*.css')
		.pipe(minifyCss())
		.pipe(gulp.dest('./css'));
});
//通用CSS合成
gulp.task('concatCommonCss', ['minifyCss'], function() {
	return gulp.src(['./css/bootstrap.min.css', './css/font-awesome.min.css', './css/general.css'])
		.pipe(concat('common.concat.css'))
		.pipe(gulp.dest('./css'));
});
//控件CSS合成
gulp.task('concatWidgetCss', ['minifyCss'], function() {
	return gulp.src(['./css/date-range.css', './css/page.css'])
		.pipe(concat('widget.concat.css'))
		.pipe(gulp.dest('./css'));
});
//页面内容备份
gulp.task('copyHtml', function() {
	return gulp.src(['./*.html'])
		.pipe(copy('./dist'));
});
//页面内容更替
gulp.task('replace', ['concatCommonCss', 'concatWidgetCss', 'concatCommonJs', 'concatWidgetJs', 'copyHtml'], function() {
	return gulp.src(['./dist/*.html'])
		.pipe(replace(/<!-- htmlbuild:commonCss -->([\s\S]*)<!-- endbuild:commonCss -->/g, '<link rel="stylesheet" type="text/css" href="css/common.concat.css"/>'))
		.pipe(replace(/<!-- htmlbuild:widgetCss -->([\s\S]*)<!-- endbuild:widgetCss -->/g, '<link rel="stylesheet" type="text/css" href="css/widget.concat.css"/>'))
		.pipe(replace(/<!-- htmlbuild:commonJs -->([\s\S]*)<!-- endbuild:commonJs -->/g, '<script src="js/common.concat.js" type="text/javascript" charset="utf-8"></script>'))
		.pipe(replace(/<!-- htmlbuild:widgetJs -->([\s\S]*)<!-- endbuild:widgetJs -->/g, '<script src="js/widget.concat.js" type="text/javascript" charset="utf-8"></script>'))
		.pipe(gulp.dest('./'));
});