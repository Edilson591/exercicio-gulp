const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const sourcemaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');

function compilaSass() {
    return gulp.src("./source/styles/main.scss")
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: "compressed"
        }))
        .pipe(sourcemaps.write(".maps"))
        .pipe(gulp.dest("./build/styles"));
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
}
