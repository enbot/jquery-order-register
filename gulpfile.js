"use strict";

const gulp = require('gulp')
const sass = require('gulp-sass')
const clean = require('gulp-clean')
const terser = require('gulp-terser')
const minifycss = require("gulp-minify-css")
const minifyhtml = require("gulp-minify-html")
const browserSync = require("browser-sync").create()
const data = require("./main.js")

// =============================================================+

gulp.task("setup", function () {
    return gulp.src('main.js')
        .pipe(gulp.dest('dist/'))
})

// =============================================================+

gulp.task('scss', () => {
    return gulp.src(data.cssPaths)
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(minifycss())
        .pipe(clean())
        .pipe(gulp.dest(data.destPath))
        .pipe(browserSync.reload({ stream: true }))
})

gulp.task("js", function () {
    return gulp.src(data.jsPaths)
        .pipe(terser())
        .pipe(gulp.dest(data.destPath))
        .pipe(browserSync.reload({ stream: true }))
})

gulp.task("html", function () {
    return gulp.src(data.htmlPaths)
        // .pipe(minifyhtml())
        .pipe(gulp.dest(data.destPath))
        .pipe(browserSync.reload({ stream: true }))
})

gulp.task("vendor", function () {
    return gulp.src('src/app/shared/vendor/**')
        .pipe(gulp.dest(data.destPath))
        .pipe(browserSync.reload({ stream: true }))
})

// =============================================================+

gulp.task("watchfiles", function () {

    browserSync.init({
        server: {
            baseDir: `${data.destPath}`,
            index: "login.html"
        }
    });

    gulp.watch(data.cssPaths, gulp.series("scss"))
    gulp.watch(data.jsPaths, gulp.series("js"))
    gulp.watch(data.htmlPaths, gulp.series("html"))
})

// =============================================================+

gulp.task('build', gulp.series(['setup', 'scss', 'js', 'html', 'vendor']))

gulp.task('run', gulp.series(['build', 'watchfiles']))


// =============================================================+
