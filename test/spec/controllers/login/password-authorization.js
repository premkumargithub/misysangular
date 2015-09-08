'use strict';

describe('Controller: PasswordAuthorizationCtrl', function () {

  // load the controller's module
  beforeEach(module('voyagerUiApp'));
  beforeEach(module('uiRouterNoop'));

  var Login, PasswordAuthorizationCtrl, q, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, _Login_, $q, $rootScope) {
    scope = $rootScope.$new();
    PasswordAuthorizationCtrl = $controller('PasswordAuthorizationCtrl', {
      $scope: scope
    });
		
		Login = _Login_;
		q = $q;
  }));
	
	it('places PasswordRecoveryValues on the scope', function() {
		expect(scope.PasswordRecoveryValues).toBeDefined();
	});
	
	it('submit requests to verify an authorization code using scope.PasswordRecoveryValues', function() {
		spyOn(Login, 'verifyAuthCode').andCallFake(function() {
			return q.defer().promise;
		});
		
		scope.submit();
		
		expect(Login.verifyAuthCode).toHaveBeenCalledWith(scope.PasswordRecoveryValues.AuthCode, scope.PasswordRecoveryValues);
	});
	
	it('submit returns a promise', function() {
		Login.verifyAuthCode = function() {
			return q.defer().promise;
		};
		
		expect(scope.submit().then).toBeDefined();
	});
	
	it('successful submit changes the state', inject(function($state) {
		Login.verifyAuthCode = function() {
			var deferment = q.defer();
			deferment.resolve({
				data: {
					CompanyName: '',
					UserName: '',
					RequireResetPasswordSecAnswer: 'true'
				}
			});
			return deferment.promise;
		};
		spyOn($state, 'go');
		
		scope.submit();
		scope.$apply();
		
		expect($state.go).toHaveBeenCalled();
	}));
	
	it('successful submit changes the state to password-recovery-security page when security answer is required', inject(function($state) {
		Login.verifyAuthCode = function() {
			var deferment = q.defer();
			deferment.resolve({
				data: {
					CompanyName: '',
					UserName: '',
					RequireResetPasswordSecAnswer: 'true'
				}
			});
			return deferment.promise;
		};
		spyOn($state, 'go');
		
		scope.submit();
		scope.$apply();
		
		expect($state.go).toHaveBeenCalledWith('base.login-template.password-recovery.password-security');
	}));
	
	it('successful submit changes the state to password-reset page when security answer is not required', inject(function($state) {
		Login.verifyAuthCode = function() {
			var deferment = q.defer();
			deferment.resolve({
				data: {
					CompanyName: '',
					UserName: '',
					RequireResetPasswordSecAnswer: 'false'
				}
			});
			return deferment.promise;
		};
		spyOn($state, 'go');
		
		scope.submit();
		scope.$apply();
		
		expect($state.go).toHaveBeenCalledWith('base.login-template.password-recovery.password-reset');
	}));
	
	it('unsuccessful submits call the error notifier function', function() {
		var response = {
			status: 401,
			data: {
				Message: 'The authorization code is invalid or has expired.'
			}
		};
		
		Login.verifyAuthCode = function() {
			var deferment = q.defer();
			deferment.reject(response);
			return deferment.promise;
		};
		spyOn(scope, 'miHttpAlertTrigger');
		
		scope.submit();
		scope.$apply();
		
		expect(scope.miHttpAlertTrigger).toHaveBeenCalledWith(response.status, response.data);
	});
});