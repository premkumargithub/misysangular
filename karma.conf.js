// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function(config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      'app/bower_components/angular/angular.js',
      'app/bower_components/angular-google-picker/src/google-picker.js',
			'app/bower_components/angular-input-masks/angular-input-masks.js',
      'app/bower_components/angular-translate/angular-translate.min.js',
      'app/bower_components/angular-mocks/angular-mocks.js',
      'app/bower_components/angular-resource/angular-resource.js',
      'app/bower_components/angular-sanitize/angular-sanitize.js',
      'app/bower_components/angular-ui-utils/ui-utils.js',
      'app/bower_components/angular-ui-router/release/angular-ui-router.js',
      'app/bower_components/mi-angular-lib/dist/scripts/mi-angular-lib.js',
      'app/bower_components/jquery/jquery.min.js',
      'app/bower_components/perfect-scrollbar/src/jquery.mousewheel.js',
      'app/bower_components/perfect-scrollbar/src/perfect-scrollbar.js',
			'app/bower_components/sass-bootstrap/js/alert.js',
			'app/bower_components/sass-bootstrap/js/modal.js',
			'app/bower_components/sass-bootstrap/js/tooltip.js',
			'app/manual_components/kendo-ui/js/kendo.web.min.js',
      'app/scripts/**/*.js',
      'test/mock/**/*.js',
      //'test/spec/**/*.js'
      'test/spec/controllers/home/admin/users/*.js',//For users only
      'test/spec/controllers/home/admin/departments/*.js'//For departments only
    ],
		
    // list of files / patterns to exclude
    exclude: [],

    // web server port
    port: 8080,
		
		reporters: ['progress', 'coverage'],
		
		// source files, that you wanna generate coverage for
		// do not include tests or libraries
		// (these files will be instrumented by Istanbul)
		preprocessors: {
			'app/scripts/**/*.js': ['coverage']
		},
		
		coverageReporter: {
      type : 'html',
      dir : 'coverage/'
    },
		
    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_ERROR,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['Chrome'],//, 'Firefox', 'IE'],


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: true
  });
};
