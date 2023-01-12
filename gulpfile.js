const {src, dest,watch, series} = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const postcss=require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const imagemin=require("gulp-imagemin");
const webp=require("gulp-webp");
const avif=require("gulp-avif");
const sourcemaps =require('gulp-sourcemaps');


function css(done){
    src("src/scss/app.scss")
        .pipe(sourcemaps.init())
        .pipe( sass() )
        .pipe( postcss([autoprefixer()]))
        .pipe(sourcemaps.write('.'))
        .pipe( dest("build/css"))
    
    done();
}

function imagenes(){
    return src("src/img/**/*")
        .pipe(imagemin({ optimizationLevel: 3}))
        .pipe(dest("build/img"));
}

function versionwebp(){
    const opciones={
        quality:50
    }
    return src("src/img/**/*.{png,jpg}")
        .pipe(webp(opciones))
        .pipe(dest("build/img"))
}

function versionavif(){
    const opciones={
        quality:50
    }
    return src("src/img/**/*.{png,jpg}")
        .pipe(avif(opciones))
        .pipe(dest("build/img"))
}

function dev(){
    watch("src/scss/**/*.scss", css);
    watch("src/img/**/*",imagenes)
}

exports.css= css;
exports.dev=dev;
exports.imagenes=imagenes;
exports.versionwebp=versionwebp;
exports.versionavif=versionavif;
exports.default=series(imagenes,versionwebp,versionavif,css,dev);