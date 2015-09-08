angular.module('voyagerUiApp', ['ngResource', 'ngSanitize', 'ui.utils.masks', 'ui.router', 'constants', 'mi-angular-lib', 'mi.templates', 'lk-google-picker']);
angular.module('voyagerUiApp').config(function(ApiRootProvider, apiRoot, $httpProvider, $stateProvider, $urlRouterProvider, lkGoogleSettingsProvider) {
	'use strict';

	ApiRootProvider.set(apiRoot);
	$httpProvider.interceptors.push('defaultHttpInterceptors');


	//@sandeepv- google drive picker API configuration
	lkGoogleSettingsProvider.configure({
		apiKey: 'AIzaSyCSe4ZiYs-yxVdjl1WlYmM1yCO4DFXJcmY',
		clientId: '653067564425-8fqmjhn81iab61ogneqridvq22a8nd64.apps.googleusercontent.com',
		scopes: ['https://www.googleapis.com/auth/drive']
	});

	/*Base state to run configuration http,
			resolves inheritted by all descendants*/
	$stateProvider
		.state('base', {
			abstract: true,
			url: '',
			resolve: {
				helpResourceSet: ['$q', '$rootScope', 'helpResources', function($q, $rootScope, helpResources) {
					var deferredAjax = $q.defer();

					helpResources.init(function(response) {
						$rootScope.helpResources = response.data;
						deferredAjax.resolve(response);
					}, function() {
						deferredAjax.reject();
					});

					return deferredAjax.promise;
				}],
				resourceSet: ['$q', '$rootScope', 'resources', function($q, $rootScope, resources) {
					var deferredAjax = $q.defer();

					resources.init('en', function(response) {
						$rootScope.resourcesObj = response.data;
						deferredAjax.resolve(response);
					}, function() {
						deferredAjax.reject();
					});

					return deferredAjax.promise;
				}],
				validationResourceSet: ['$q', '$rootScope', 'validationResources', function($q, $rootScope, validationResources) {
					var deferredAjax = $q.defer();

					validationResources.init(function(response) {
						$rootScope.validationResourcesObj = response.data;
						deferredAjax.resolve(response);
					}, function() {
						deferredAjax.reject();
					});

					return deferredAjax.promise;
				}]
			}
		});

	$stateProvider
		.state('base.home', {
			abstract: true,
			url: '/home',
			views: {
				'base-content@': {
					templateUrl: 'views/home/index.html',
					controller: 'HomeCtrl'
				}
			},
			resolve: {
				'companyName': ['Company', '$q', 'Session', function(Company, $q, Session) {
					var deferment = $q.defer();

					if (Session.getSessionData().sessionID !== null) {
						Company.getCompanyProfile({}, function success(data) {
							deferment.resolve(data.CompanyName);
						}, function error() {
							deferment.reject();
						});
					} else {
						deferment.reject();
					}

					return deferment.promise;
				}],
				'userName': ['$q', 'Session', 'UsersService', function($q, Session, UsersService) {
					var deferment = $q.defer();

					if (Session.getSessionData().sessionID !== null) {
						UsersService.getSessionUser().then(function success(response) {
							deferment.resolve(response.data.Name);
						}).catch (function error() {
							deferment.reject();
						});
					} else {
						deferment.reject();
					}

					return deferment.promise;
				}]
			}
		});
	$stateProvider
		.state('base.home.about', {
			url: '/about',
			views: {
				'home-content': {
					controller: 'AboutCtrl',
					templateUrl: 'views/home/about.html'
				}
			}
		});

	$urlRouterProvider.otherwise('/login');

});

angular.module('voyagerUiApp').run(function($location, $rootScope, $state) {
	'use strict';

	//Workaround for ui-router which currently strips query strings
	var locationSearch;
	$rootScope.$on('$stateChangeStart', function() {
		//Save location.search to add it back after state change
		locationSearch = $location.search();
	});

	$rootScope.$on('$stateChangeSuccess', function() {
		//Restore all query string parameters
		$location.search(locationSearch);
	});

	//If there is any rejected promise during resolves, redirect to login (which may redirect to home)
	$rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
		console.log(event, toState, toParams, fromState, fromParams, error);
		$state.go('base.login-template.default');
	});
});
