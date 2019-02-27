const { src, dest, series, watch } = require('gulp')
const uglify = require('gulp-uglify')
const rename = require('gulp-rename')
const webserver = require('gulp-webserver')
const pug = require('gulp-pug')
const sass = require('gulp-sass')
sass.compiler = require('node-sass')
const imagemin = require('gulp-imagemin')

function pugToHtml(cb) {
    src('src/*.pug')
        .pipe(pug())
        .pipe(rename({extname: '.htm'}))
        .pipe(dest('dist/'))
    cb()
}

function scssToCss(cb) {
    src('src/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(dest('dist/'))
    cb()
}

function js(cb) {
    src('src/*.js')
        .pipe(uglify())
        .pipe(dest('dist/'))
    cb()
}

function imageMin(cb) {
    src('src/assets/images/*')
        .pipe(imagemin())
        .pipe(dest('dist/assets/images/'))
    cb()
}

function initWebServer(cb) {
    src('dist')
        .pipe(webserver({
            livereload: true,
            open: true
        }))
}

watch('src/**/*.pug', pugToHtml)
watch('src/**/*.scss', scssToCss)
watch('src/**/*.js', js)
watch('src/assets/images/*', imageMin)

exports.serve = initWebServer