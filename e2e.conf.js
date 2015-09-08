var extend = require('extend');
var q = require('q');
var request = require('request');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

// A reference configuration file.
exports.config = {
  seleniumServerJar: 'drivers/selenium-server-standalone-2.40.0.jar',
  chromeDriver: 'drivers/chromedriver',
  chromeOnly: false,
  // Additional command line options to pass to selenium. For example,
  // if you need to change the browser timeout, use
  // seleniumArgs: ['-browserTimeout=60'],
  seleniumArgs: [],
  //The timeout for each script run on the browser.
  allScriptsTimeout: 40000,
	
	framework: 'jasmine',
  specs: [
    'test/e2e/**/*.js',
  ],
  exclude: [],

  // ----- Capabilities to be passed to the webdriver instance ----
  //
  // For a full list of available capabilities, see
  // https://code.google.com/p/selenium/wiki/DesiredCapabilities
  // and
  // https://code.google.com/p/selenium/source/browse/javascript/webdriver/capabilities.js
  capabilities: {
    'browserName': 'chrome'
  },

  // If you would like to run more than one instance of webdriver on the same
  // tests, use multiCapabilities, which takes an array of capabilities.
  // If this is specified, capabilities will be ignored.
  multiCapabilities: [],

  // A callback function called once protractor is ready and available, and
  // before the specs are executed
  // You can specify a file containing code to run by setting onPrepare to
  // the filename string.
  onPrepare: function() {
		var deferment, target, sourceData, destinationData;
		target = browser.params.target;
		sourceData = {
			delete: 'true',
			SourceCompanyID: 1002,
			SourceDatabase: 'dev-snapshots',
			SourceSqlServer: 'tcp:m4mp0gpfvv.database.windows.net,1433'
		};
		destinationData = {
			'local': {
				DestinationCompanyID: 7069,
				DestinationDatabase: 'dev',
				DestinationSqlServer: 'tcp:m4mp0gpfvv.database.windows.net,1433'
			},
			'dev': {
				DestinationCompanyID: 7069,
				DestinationDatabase: 'dev',
				DestinationSqlServer: 'tcp:m4mp0gpfvv.database.windows.net,1433'
			},
			'qa': {
				DestinationCompanyID: 2007,
				DestinationDatabase: 'qa',
				DestinationSqlServer: 'tcp:kat4ho4exf.database.windows.net,1433'
			},
			'production': {
				DestinationCompanyID: 1013,
				DestinationDatabase: 'production',
				DestinationSqlServer: 'tcp:yr5umae4be.database.windows.net,1433'
			}
		};
		
		console.log('\n----- Preparing protractor tests -----');
		deferment = q.defer();
		browser.wait(function() {
			var requestData, requestUrl, host, path;
			requestData = extend({}, destinationData[target], sourceData);
			path = '/api/import';
			
			switch(target) {
				case "local":
					host = 'https://127.0.0.1:8080';
					break;
				case "dev":
					host = 'https://dev-api.misysenterprise.com:8080';
					break;
				case "qa":
					host = 'https://qa-api.misysenterprise.com:8080';
					break;
				case "production":
					host = 'https://api.misysenterprise.com:8080';
					break;
			}
			
			requestUrl = host+path;
			
			console.log('Resetting protractor company at url "'+requestUrl+'" with data:\n');
			console.log(requestData);
			console.log('\n');
			
			request.post(requestUrl, {
				json: requestData,
			}, function(error, response) {
				if(error) {
					console.log(error, response);
					console.log('Status: '+response.statusCode);
					if(response.body.Message !== undefined) {
						console.log(response.body.Message);
					}
					deferment.reject(response.body.Message);
				} else {
					console.log('Status: '+response.statusCode);
					if(response.body.Message !== undefined) {
						console.log(response.body.Message);
					}
					if(response.body.ExceptionMessage !== undefined) {
						console.log(response.body.ExceptionMessage);
					}
					deferment.resolve(response.body);
				}
			});
			
			return deferment.promise;

		});
		deferment.promise.done(function() {
			console.log('--------------------------------------');
		});
		
		browser.driver.manage().window().maximize();
		return deferment.promise;
  },

  // The params object will be passed directly to the protractor instance,
  // and can be accessed from your test. It is an arbitrary object and can
  // contain anything you may need in your test.
  // This can be changed via the command line as:
  //   --params.login.user 'Joe'
  params: {
		companyid: 'NEWC6660',
    users: {
			admin: {
				username: 'KAP0',
				password: '$pass2MISys$'
			},
			user: {
                username: 'SANDEEPV',
                password: 'password'
			}
		},
		loadApp: function() {
			browser.addMockModule('voyagerUiApp', function() {
				angular.module('voyagerUiApp').value('HttpWaitTime', 0);
			});
			browser.get('/');
			browser.params.waitForUrlToBe('#/login');
		},
		login: function(user) {
			browser.params.waitForUrlToBe('#/login');
			element(by.name('resourcesloginpropertiescompanyname')).getAttribute('value').then(function(value) {
				if(value !== 'protractor') {
					element(by.name('resourcesloginpropertiescompanyname')).sendKeys(browser.params.companyid);
				}
        //el.click();

			});
			element(by.name('resourcesloginpropertiesusername')).sendKeys(user.username);
			element(by.name('resourcesuserpropertiespassword')).sendKeys(user.password);
			element(by.css('button.mi-button')).click();
		},
		logout: function(closeModal) {
			var getModalWindowNo = function() {
				return $('.modal .modal-dialog .modal-footer button.btn-danger');
			}
			
			if(closeModal === null) {
				closeModal = false;
			}
			
			element(by.css('section.primary ul.misc-tools li.user')).click();
			element(by.css('section.primary ul.misc-tools li.user ul li:last-child a')).click();
			
			if(closeModal) {
				//Transition time for modal window - found in bootstrap source
				browser.sleep(1900);
				var el = getModalWindowNo();
                el.click();
			}
			
			browser.params.waitForUrlToBe('#/login');
		},
		waitForUrlToBe: function(urlFragment) {
			var currentUrl, currentUrlPromise, waitingPromise;
			
			currentUrlPromise = browser.getCurrentUrl().then(function storeCurrentUrl(url) {
				currentUrl = url;
			});
			
			waitingPromise = currentUrlPromise.then(function waitForUrlToBe() {
				return browser.wait(function waitForUrlToBe() {
					return browser.getCurrentUrl().then(function compareCurrentUrl(url) {
						return url.indexOf(urlFragment) >= 0;
					});
				});
			});
			
			return waitingPromise;
		}
  },

  // ----- The cleanup step -----
  //
  // A callback function called once the tests have finished running and
  // the webdriver instance has been shut down. It is passed the exit code
  // (0 if the tests passed or 1 if not).
  onCleanUp: function() {}
};
