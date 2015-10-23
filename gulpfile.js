/*global -$ */
'use strict';

var gulp = require('gulp'),
	minifyHTML = require('gulp-minify-html'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	cssmin = require('gulp-cssmin'),
	sourcemaps = require('gulp-sourcemaps'),
	inject = require('gulp-inject'),
	browsersync = require('browser-sync').create();

var reload = browsersync.reload;

var config = {
    paths: {
        html: {
            src:  ["src/**/*.html"],
            dest: "build"
        },

        javascript: {
            src:  ["src/js/**/*.js"],
            dest: "build/js"
        },

        css: {
            src:  ["src/css/**/*.css"],
            dest: "build/css"
        },

        custom_css: {
        	src:  ["src/custom_css/**/*.css"],
            dest: "build/custom_css"
        },

        custom_js: {
        	src:  ["src/custom_js/**/*.css"],
            dest: "build/custom_js"
        }
    }
}

//HTML minification

gulp.task("html", function(){
    return gulp.src(config.paths.html.src)
        .pipe(minifyHTML())
        .pipe(gulp.dest(config.paths.html.dest));
});

gulp.task("scripts", function(){
    return gulp.src(config.paths.javascript.src)
    	.pipe(sourcemaps.init())
    	.pipe(concat("app.min.js"))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.paths.javascript.dest));
});

gulp.task("css", function(){
    return gulp.src(config.paths.css.src)
        .pipe(sourcemaps.init())
        .pipe(concat("styles.min.css"))
        .pipe(cssmin())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.paths.css.dest));
});

gulp.task('browser-sync', function() {
    browsersync.init({
        server: {
            baseDir: "./src/"
        }
    });
});


gulp.task('inject-custom-styles-scripts', function () {
  var target = gulp.src('./src/**/*.html');  
 
  return target.pipe(inject(gulp.src(['./src/custom_js/*.js', './src/custom_css/*.css'], {read: false}), {relative: true}))
    .pipe(gulp.dest('./src'));
});


gulp.task("serve", ["browser-sync"], function(){
	gulp.watch(config.paths.html.src, ["html", browsersync.reload]);
	gulp.watch(config.paths.css.src, ["css", browsersync.reload]);
});




gulp.task("build", ["html", "scripts", "css"]);