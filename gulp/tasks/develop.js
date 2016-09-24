/*-------------------------------------------------------------------
  Required plugins
-------------------------------------------------------------------*/
var gulp = require('gulp')
var autoprefixer = require('gulp-autoprefixer')
var sass = require('gulp-sass')
var browserSync = require('browser-sync').create()
var supervisor = require("gulp-supervisor");
var config = require('./../../config/app.json')
var app = require('./../../app')
console.log(config.port);

/*-------------------------------------------------------------------
  Configuration
-------------------------------------------------------------------*/
var AUTOPREFIXER_BROWSERS = [
  'ie >= 8',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 4',
  'opera >= 23',
  'ios >= 4',
  'android >= 4.0',
  'bb >= 10'
];

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
  chtml: path.chtml + '/**/*.html'
};


/*-------------------------------------------------------------------
  DEVELOP
-------------------------------------------------------------------*/
gulp.task("default",['serve','sass','node'] ,function (callback) {
	
});


gulp.task('serve', function(){

    browserSync.init({
    	proxy:"localhost:"+config.port
      // port:config.port,
      //   server: {
      //       baseDir: "./"
      //   }
    });
    gulp.watch(watch.scss, ['sass']);
    gulp.watch([watch.js,watch.css,watch.scss,watch.html,watch.chtml]).on('change', browserSync.reload);

});

gulp.task('sass', function(){

	return gulp.src(watch.scss)
	.pipe(sass({
		style:'expanded',
		precision:10
	}).on('error',sass.logError))
	.pipe(autoprefixer(AUTOPREFIXER_BROWSERS))
	.pipe(gulp.dest(path.css))
	.pipe(browserSync.stream());

});

gulp.task('node', function (complete) {

    supervisor("app.js",{
        args: ["--dev"],
        watch: ["app",'routes'],
        ignore: ["tasks", "src", "node_modules", "public", "views"],
        pollInterval: 500,
        extensions: ["js"],
        exec: "node",
        debug: false,
        debugBrk: false,
        harmony: true,
        noRestartOn: "exit",
        forceWatch: true,
        quiet: false
    });
    complete();
});

