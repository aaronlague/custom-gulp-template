/*global -$ */
'use strict';

var gulp = require('gulp'),
	minifyHTML = require('gulp-minify-html'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	cssmin = require('gulp-cssmin'),
	sourcemaps = require('gulp-sourcemaps'),
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


gulp.task("serve", ["browser-sync"], function(){
	gulp.watch(config.paths.html.src, ["html", browsersync.reload]);
	gulp.watch(config.paths.css.src, ["css", browsersync.reload]);
});

gulp.task("build", ["html", "scripts", "css"]);