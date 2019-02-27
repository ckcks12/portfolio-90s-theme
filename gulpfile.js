const { src, dest, series, watch } = require('gulp')
const uglify = require('gulp-uglify')
const rename = require('gulp-rename')
const webserver = require('gulp-webserver')
const pug = require('gulp-pug')
const sass = require('gulp-sass')
sass.compiler = require('node-sass')
const imagemin = require('gulp-imagemin')
const distPath = 'docs/' // for github page

function pugToHtml(cb) {
    src('src/*.pug')
        .pipe(pug())
        .pipe(rename({extname: '.htm'}))
        .pipe(dest('docs/'))
    cb()
}

function scssToCss(cb) {
    src('src/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(dest('docs/'))
    cb()
}

function js(cb) {
    src('src/*.js')
        .pipe(uglify())
        .pipe(dest('docs/'))
    cb()
}

function imageMin(cb) {
    src('src/assets/images/*')
        .pipe(imagemin())
        .pipe(dest('docs/assets/images/'))
    cb()
}

function initWebServer(cb) {
    src('docs')
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