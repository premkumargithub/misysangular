'use strict';

describe('Controller: PasswordSecurityCtrl', function () {

  // load the controller's module
  beforeEach(module('voyagerUiApp'));
  beforeEach(module('uiRouterNoop'));
  beforeEach(module('mockResources'));

	var Login, PasswordSecurityCtrl, q, scope;
	
  beforeEach(inject(function ($controller, _Login_, $q, $rootScope, resources) {
		_Login_.getSecurityQuestion = function() {
			var deferment = $q.defer();
			deferment.resolve({
				data: {
					SecurityQuestion: 'If you could only do one exercise for the rest of your life, when and how often would you deadlift?'
				}
			});
			return deferment.promise;
		};
		
		scope = $rootScope.$new();
		scope.resourcesObj = resources.get();
    PasswordSecurityCtrl = $controller('PasswordSecurityCtrl', {
      $scope: scope
    });
		
		Login = _Login_;
		q = $q;
  }));
	
	it('places PasswordRecoveryValues on the scope', function() {
		expect(scope.PasswordRecoveryValues).toBeDefined();
	});
	
	it('submit requests to verify a security answer using scope.PasswordRecoveryValues', function() {
		spyOn(Login, 'verifySecurityAnswer').andCallFake(function() {
			return q.defer().promise;
		});
		
		scope.submit();
		
		expect(Login.verifySecurityAnswer).toHaveBeenCalledWith(scope.PasswordRecoveryValues);
	});
	
	it('submit returns a promise', function() {
		Login.verifySecurityAnswer = function() {
			return q.defer().promise;
		};
		
		expect(scope.submit().then).toBeDefined();
	});
	
	it('successful submit, with response "true" changes the state', inject(function($state) {
		Login.verifySecurityAnswer = function() {
			var deferment = q.defer();
			deferment.resolve({
				data: 'true'
			});
			return deferment.promise;
		};
		spyOn($state, 'go');
		
		scope.submit();
		scope.$apply();
		
		expect($state.go).toHaveBeenCalledWith('base.login-template.password-recovery.password-reset');
	}));
	
	it('unsuccessful submits, with status 200, call the error notifier function', function() {
		var response = {
			status: 200,
			data: 'false'
		};
		
		Login.verifySecurityAnswer = function() {
			var deferment = q.defer();
			deferment.resolve(response);
			return deferment.promise;
		};
		spyOn(scope, 'miHttpAlertTrigger');
		
		scope.submit();
		scope.$apply();
		
		expect(scope.miHttpAlertTrigger).toHaveBeenCalled();
	});
	
	it('unsuccessful submits, with status 401, call the error notifier function', function() {
		var response = {
			status: 401,
			data: {
				Message: 'The answer to the security question is incorrect. This account is locked. Locked accounts can only be unlocked by your local MISys administrator.'
			}
		};
		
		Login.verifySecurityAnswer = function() {
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
