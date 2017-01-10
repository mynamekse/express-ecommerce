var gulp = require('gulp'),
	nodemon = require('gulp-nodemon'),
	plumber = require('gulp-plumber'),
	livereload = require('gulp-livereload');
var browserSync = require('browser-sync');

// start our server and listen for changes
gulp.task('browserSync-init', function() {
	browserSync.init({
		notify: false,
		// open: false,
		// informs browser-sync to proxy our expressjs app which would run at the following location

		proxy: {
			target: "http://0.0.0.0:8080", // can be [virtual host, sub-directory, localhost with port]
			// ws: true // enables websockets
		},
		port: 8082,
		browser: ['google-chrome']
	});
})
gulp.task('serve', ['browserSync-init'], function(cb) {


	var started = false;
	nodemon({
		// the script to run the app
		script: './bin/www',

		ignore: [
			'./bower_components/**',
			'./node_modules/**',
			'./build/**'
		],
		// this listens to changes in any of these files/routes and restarts the application
		watch: ["server/routes/"],
		ext: 'js twig'
			// Below i'm using es6 arrow functions but you can remove the arrow and have it a normal .on('restart', function() { // then place your stuff in here }
	}).on('restart', () => {
		setTimeout(function reload() {
			browserSync.reload();
		}, 500);

		browserSync.reload();
		console.log('restart');
		// gulp.src('server.js')
		//   // I've added notify, which displays a message on restart. Was more for me to test so you can remove this
		//   .pipe(notify('Running the start tasks and stuff'));
	}).on('start', function() {
		// to avoid nodemon being started multiple times
		// thanks @matthisk
		console.log('starrt');
		if (!started) {
			cb();
			started = true;
		}
	});

	;
});
