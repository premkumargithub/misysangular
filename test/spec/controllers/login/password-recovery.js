'use strict';

describe('Controller: PasswordRecoveryCtrl', function () {

  // load the controller's module
  beforeEach(module('voyagerUiApp'));
	beforeEach(module('uiRouterNoop'));

	var Login, PasswordRecoveryCtrl, q, scope;
	
  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $q, $rootScope, _Login_) {
		scope = $rootScope.$new();
    PasswordRecoveryCtrl = $controller('PasswordRecoveryCtrl', {
      $scope: scope
    });
		
		Login = _Login_;
		q = $q;
  }));
	
	it('places PasswordRecoveryValues on the scope', function() {
		expect(scope.PasswordRecoveryValues).toBeDefined();
	});
	
	it('submit request for authorization code using scope.PasswordRecoveryValues', function() {
		spyOn(Login, 'mailAuthCode').andCallFake(function() {
			return q.defer().promise;
		});
		
		scope.submit();
		
		expect(Login.mailAuthCode).toHaveBeenCalledWith(scope.PasswordRecoveryValues);
	});
	
	it('submit returns a promise', function() {
		Login.mailAuthCode = function() {
			return q.defer().promise;
		};
		
		expect(scope.submit().then).toBeDefined();
	});
	
	it('successful submits change the state the next stage of the recovery process', inject(function($state) {
		Login.mailAuthCode = function() {
			var deferment = q.defer();
			deferment.resolve({
				data: {
					CompanyName: '',
					UserName: ''
				}
			});
			return deferment.promise;
		};
		spyOn($state, 'go');
		
		scope.submit();
		scope.$apply();
		
		expect($state.go).toHaveBeenCalledWith('base.login-template.password-recovery.password-reset-code');
	}));
	
	it('unsuccessful submits call the error notifier function', function() {
		var response = {
			status: 401,
			data: {
				Message: 'The company was not found.'
			}
		};
		
		Login.mailAuthCode = function() {
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
