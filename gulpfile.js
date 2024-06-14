const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const sourcemaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');
const ofuscate = require('gulp-obfuscate')
const uglify = require('gulp-uglify')

function compilaSass() {
    return gulp.src("./source/styles/main.scss")
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: "compressed"
        }))
        .pipe(sourcemaps.write(".maps"))
        .pipe(gulp.dest("./build/styles"));
}

function compilaJavaScript() {
    return gulp.src("./source/script/*.js")
            .pipe(uglify())
            .pipe(ofuscate())
            .pipe(gulp.dest("./build/script"))
}

function compilaImg(){
    return gulp.src("./source/images/*")
        .pipe(imagemin())
        .on('error', function(err) {
            console.error('Erro na otimização de imagens:', err);
        })
        .pipe(gulp.dest("./build/images/"))
        .on('end', function() {
            console.log("Imagens otimizadas com sucesso!");
        });
}

exports.default = function() {
    gulp.watch('./source/styles/*.scss', { ignoreInitial: false }, gulp.series(compilaSass));
    gulp.watch('./source/images/*', { ignoreInitial: false }, gulp.series(compilaImg));
    gulp.watch('./source/script/*js', { ignoreInitial: false }, gulp.series(compilaJavaScript));
}
