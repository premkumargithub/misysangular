'use strict';

describe('Controller: PasswordResetCtrl', function () {

  // load the controller's module
  beforeEach(module('voyagerUiApp'));
	beforeEach(module('stateMock'));
	beforeEach(module('mockResources'));

  var Login, PasswordResetCtrl, q, scope, Session, state;

  beforeEach(inject(function ($controller, _Login_, $q, $rootScope, _Session_, $state) {
    scope = $rootScope.$new();
    PasswordResetCtrl = $controller('PasswordResetCtrl', {
      $scope: scope
    });
		
		Login = _Login_;
		q = $q;
		Session = _Session_;
		state = $state;
  }));
	
	it('places PasswordRecoveryValues on the scope', function() {
		expect(scope.PasswordRecoveryValues).toBeDefined();
	});
	
	it('places NewPasswordVerify on the scope', function() {
		expect(scope.NewPasswordVerify).toBeDefined();
	});
	
	it('submit requests to verify an authorization code using scope.PasswordRecoveryValues', function() {
		spyOn(Login, 'resetPassword').andCallFake(function() {
			return q.defer().promise;
		});
		
		scope.submit();
		
		expect(Login.resetPassword).toHaveBeenCalledWith(scope.PasswordRecoveryValues);
	});
	
	it('submit returns a promise', function() {
		Login.resetPassword = function() {
			return q.defer().promise;
		};
		
		expect(scope.submit().then).toBeDefined();
	});
	
	it('successful submit requests login with the given information', function() {
		Login.resetPassword = function() {
			var deferment = q.defer();
			deferment.resolve();
			return deferment.promise;
		};
		spyOn(Session, 'start');
		
		scope.submit();
		scope.$apply();
		
		expect(Session.start).toHaveBeenCalled();
	});
	
	it('successful submit followed by successful login changes the state to home page', function() {
		Login.resetPassword = function() {
			var deferment = q.defer();
			deferment.resolve();
			return deferment.promise;
		};
		Session.start = function(data, successFn) {
			successFn();
		};
		spyOn(state, 'go');
		
		scope.submit();
		scope.$apply();
		
		expect(state.go).toHaveBeenCalledWith('base.home.dashboard');
	});
	
	it('successful submit followed by unsuccessful login changes the state to login page', function() {
		Login.resetPassword = function() {
			var deferment = q.defer();
			deferment.resolve();
			return deferment.promise;
		};
		Session.start = function(data, successFn, errorFn) {
			errorFn();
		};
		spyOn(state, 'go');
		
		scope.submit();
		scope.$apply();
		
		expect(state.go).toHaveBeenCalledWith('base.login-template.default');
	});
	
	it('unsuccessful submits call the error notifier function', function() {
		var response = {
			status: 401,
			data: {
				Message: 'New password has invalid characters.'
			}
		};
		
		Login.resetPassword = function() {
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
