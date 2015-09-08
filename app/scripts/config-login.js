angular.module('voyagerUiApp').config(function ($stateProvider, $urlRouterProvider) {
	'use strict';

	/*Login States*/
	$stateProvider
	.state('base.login-template', {
		abstract : true,
		url : '/login',
		views : {
			'base-content@' : {
				templateUrl : 'views/login/login-template.html',
				controller : 'LoginCtrl'
			}
		},
		onEnter : ['Session', '$state', function (Session, $state) {
				if (Session.getSessionData().sessionID !== null) {
					$state.go('base.home.dashboard', null, {
						reload : true
					});
				}
			}
		]
	});

	$stateProvider
	.state('base.login-template.default', {
		url : '',
		views : {
			'login-content' : {
				templateUrl : 'views/login/login.html',
				controller : 'LoginCtrl'
			}
		}
	});

	$stateProvider
	.state('base.login-template.register', {
		abstract : true,
		url : '/register',
		views : {
			'login-content' : {
				templateUrl : 'views/login/register/register-template.html',
				controller : 'RegisterBaseCtrl'
			}
		}
	})
	.state('base.login-template.register.step-one', {
		url : '/step-one',
		views : {
			'register-content' : {
				templateUrl : 'views/login/register/step-one/form.html',
				controller : 'RegisterStepOneCtrl'
			}
		}
	})
	.state('base.login-template.register.step-two', {
		url : '/step-two',
		views : {
			'register-content' : {
				templateUrl : 'views/login/register/step-two/form.html',
				controller : 'RegisterStepTwoCtrl'
			}
		}
	})
	.state('base.login-template.register.confirm', {
		url : '/confirm',
		views : {
			'register-content' : {
				templateUrl : 'views/login/register/confirm/form.html',
				controller : 'RegisterConfirmCtrl'
			}
		}
	})
	.state('base.login-template.register.email-sent', {
		url : '/email-sent',
		views : {
			'register-content' : {
				templateUrl : 'views/login/register/email-sent/form.html'
			}
		}
	})
	.state('base.login-template.register.email-confirmation', {
		url : '/email-confirmation',
		views : {
			'register-content' : {
				controller : 'EmailConfirmationCtrl',
				templateUrl : 'views/login/register/email-confirmation/form.html'
			}
		}
	})
	.state('base.login-template.register.complete', {
		url : '/complete',
		views : {
			'register-content' : {
				templateUrl : 'views/login/register/complete/form.html'
			}
		}
	});

	$stateProvider
	.state('base.login-template.password-recovery', {
		abstract : true,
		url : '/password-recovery',
		views : {
			'login-content' : {
				templateUrl : 'views/login/password-recovery/password-recovery-template.html',
				//controller : 'PasswordRecoveryCtrl'
			}
		}
	})
	.state('base.login-template.password-recovery.password-recovery', {
		url : '/',
		views : {
			'password-recovery-content' : {
				templateUrl : 'views/login/password-recovery/password-recovery.html',
				controller : 'PasswordRecoveryCtrl'
			}
		}
	})
	.state('base.login-template.password-recovery.password-reset-code', {
		url : '/reset-code',
		views : {
			'password-recovery-content' : {
				templateUrl : 'views/login/password-recovery/password-reset-code.html',
				controller : 'PasswordAuthorizationCtrl'
			}
		}
	})
	.state('base.login-template.password-recovery.password-security', {
		url : '/security',
		views : {
			'password-recovery-content' : {
				templateUrl : 'views/login/password-recovery/password-security.html',
				controller : 'PasswordSecurityCtrl'
			}
		},
		resolve : {
			securityQuestion : ['$q', 'PasswordRecoveryValues', function ($q, PasswordRecoveryValues) {
					var deferred = $q.defer();

					if (PasswordRecoveryValues.AuthCode === '') {
						deferred.reject();
					} else {
						deferred.resolve();
					}

					return deferred.promise;
				}
			]
		}
	})
	.state('base.login-template.password-recovery.password-reset', {
		url : '/reset',
		views : {
			'password-recovery-content' : {
				templateUrl : 'views/login/password-recovery/password-reset.html',
				controller : 'PasswordResetCtrl'
			}
		},
		onEnter : ['$q', 'PasswordRecoveryValues', function ($q, PasswordRecoveryValues) {
				var deferred = $q.defer();

				console.log(PasswordRecoveryValues);

				if (!PasswordRecoveryValues.CompanyName || !PasswordRecoveryValues.UserName || !PasswordRecoveryValues.AuthCode) {
					deferred.reject();
				} else {
					deferred.resolve();
				}

				return deferred.promise;
			}
		]
	});

	$urlRouterProvider
	.when('/login/register', '/login/register/step-one')
	.when('/login/password-recovery', '/login/password-recovery/password-recovery');
});
