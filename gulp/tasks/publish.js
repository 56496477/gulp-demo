/*-------------------------------------------------------------------
  Required plugins
-------------------------------------------------------------------*/
var gulp = require("gulp");
var uglify = require("gulp-uglify");
var runSequence = require("run-sequence");
var minifyCss = require("gulp-minify-css");
var rev = require("gulp-rev");
var revReplace = require("gulp-rev-replace");
var exec = require("child_process").exec;
var ejs = require("gulp-ejs");


/*-------------------------------------------------------------------
  Configuration
-------------------------------------------------------------------*/
var path = {
  js: './src/js',
  images: './src/images',
  css: './src/css',
  scss: './src/scss',
  html: './views',
  chtml: './views/components'
};

var watch = {
  js: path.js + '/*.js',
  images: path.images + '/*',
  css: path.css + '/*.css',
  scss: path.scss + '/*.scss',
  html: path.html + '/**/*.html',
  chtml: path.chtml + '/**/*.html',
  nhtml: path.html + '/*.html'
};

var publish = {
	js: './public/js/',
	css: './public/css/',
	images: './public/images/',
	html: './public/'
}


/*-------------------------------------------------------------------
  PUBLISH
-------------------------------------------------------------------*/
gulp.task('publish',['clear'],function () {
    runSequence('sass','copy-image','compile-html','only-copy-libjs','copy-css');
});

function compileHtml(cdnUrl){
    return gulp.src(watch.html)
        .pipe(ejs({
            relativePath:cdnUrl,
            mrelativePath:"..",
            version: Date.now()
        }))
        .pipe(gulp.dest(publish.html));
}

gulp.task("compile-html",function(){
    return compileHtml('.');
});


gulp.task("only-copy-libjs", function () {
    return gulp.src(watch.js)
        .pipe(gulp.dest(publish.js));
});


gulp.task("copy-image",function(){
    return gulp.src(watch.images)
        .pipe(gulp.dest(publish.images))
});

gulp.task("copy-css",function(){
    return gulp.src(watch.css)    
        .pipe(gulp.dest(publish.css))
});


gulp.task("clear", function (done) {
    exec("rm -rf ./public/images && rm -rf ./public/js && rm -rf ./public/css  && rm ./public/*.html",function(){
       done();
    });
});

