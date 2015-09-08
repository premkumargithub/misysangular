'use strict';

describe('Directive: miUserPanel', function () {

  // load the directive's module
  beforeEach(module('voyagerUiApp'));
  beforeEach(module('uiRouterNoop'));
  beforeEach(module('mockResources'));
  beforeEach(module('mockResourcePanel'));

  var compileElement, scope, UsersService, User, q, getEmptyPromise, getUnsuccessfulPromise, getSuccessfulPromise, ViewModes;
  beforeEach(inject(function ($compile, $q, $rootScope, $templateCache, $timeout, _User_, _UsersService_, _ViewModes_) {
		//An "empty promise" is intended to be a promise that will never be resolved/rejected
		getEmptyPromise = function() {
			return $q.defer().promise;
		};
		getSuccessfulPromise = function(response) {
			var deferment = q.defer();
			deferment.resolve(response);
			return deferment.promise;
		};
		getUnsuccessfulPromise = function(response) {
			var deferment = q.defer();
			deferment.reject(response);
			return deferment.promise;
		};
		
		compileElement = function() {
			var element = $compile(angular.element(
				'<mi-user-panel '+
					'resource-id="ResourceID" '+
					'mode="mode" '+
					'parent-state="parentState" '+
				'></mi-user-panel>'
			))(scope);
			
			$rootScope.$apply();
			$timeout.flush();
			
			return element;
		};
	
		scope = $rootScope.$new();
		scope.ResourceID = 'abc-123';
		scope.mode = _ViewModes_.readonly;
		scope.parentState = 'base.home.test.spec';
		
		ViewModes = _ViewModes_;
		UsersService = _UsersService_;
		UsersService.getSessionUser = function() {
			return $q.defer().promise;
		};
		User = _User_;
		
		q = $q;
  }));
	
	describe('Inheritted values', function() {
		it('saves resourceObj to scope', function() {
			expect(compileElement().isolateScope().resourcesObj).toBeDefined();
		});

		it('has an array of tabs that each have a "name" and "templateUrl" property', function() {
			angular.forEach(compileElement().isolateScope().tabs, function(tab) {
				expect(tab.name).toBeDefined();
				expect(tab.templateUrl).toBeDefined();
			});
		});
			
	});
	
	describe('Group of Crud methods', function() {
		it('has a getNew request', function() {
			var mockedPromise, returnValue;
			mockedPromise = q.defer().promise;
			
			spyOn(UsersService, 'getNew').andReturn(mockedPromise);
			returnValue = compileElement().isolateScope().getNew();
			
			expect(UsersService.getNew).toHaveBeenCalledWith();
			expect(returnValue).toBe(mockedPromise);
		});
		
		it('has a get request encapsulating the ResourceID', function() {
			var mockedPromise, returnValue;
			mockedPromise = q.defer().promise;
			
			spyOn(UsersService, 'get').andReturn(mockedPromise);
			returnValue = compileElement().isolateScope().get();
			
			expect(UsersService.get).toHaveBeenCalledWith('abc-123');
			expect(returnValue).toBe(mockedPromise);
		});
		
		it('has a delete request encapsulating the ResourceID', function() {
			var mockedPromise, returnValue;
			mockedPromise = q.defer().promise;
			
			spyOn(UsersService, 'delete').andReturn(mockedPromise);
			returnValue = compileElement().isolateScope().delete();
			
			expect(UsersService.delete).toHaveBeenCalledWith('abc-123');
			expect(returnValue).toBe(mockedPromise);
		});
		
		it('has a save request which passes data', function() {
			var element, userData, mockedPromise, returnValue;
			userData = {ResourceID : scope.ResourceID};
			element = compileElement();
			mockedPromise = q.defer().promise;
			
			spyOn(UsersService, 'save').andReturn(mockedPromise);
			returnValue = element.isolateScope().save(userData);
			
			expect(UsersService.save).toHaveBeenCalledWith(userData);
			expect(returnValue).toBe(mockedPromise);
		});
		
		it('has an update request which passes data', function() {
			var element, userData, mockedPromise, returnValue;
			element = compileElement();
			userData = {ResourceID : scope.ResourceID};
			mockedPromise = q.defer().promise;
			
			spyOn(UsersService, 'update').andReturn(mockedPromise);
			returnValue = element.isolateScope().update(userData);
			
			expect(UsersService.update).toHaveBeenCalledWith(userData);
			expect(returnValue).toBe(mockedPromise);
		});
	});

	describe('Validation Controls for', function() {
	
		describe('AskSecurityQuestionOnLogin', function() {
			it('is disabled if current user\'s SecurityGroup is not "ADMIN"', function() {
				var element = compileElement();
				element.isolateScope().currentUser = new User();
				element.isolateScope().currentUser.SecurityGroupID = 'USER';
				expect(element.isolateScope().controls.AskSecurityQuestionOnLogin.disabled()).toBe(true);
			});
			
			it('is not disabled if current user\'s SecurityGroup is "ADMIN"', function() {
				var element = compileElement();
				element.isolateScope().currentUser = new User();
				element.isolateScope().currentUser.SecurityGroupID = 'ADMIN';
				expect(element.isolateScope().controls.AskSecurityQuestionOnLogin.disabled()).toBe(false);
			});
		});
		
		describe('LoginConflict', function() {
			it('is disabled if current user is ADMIN and but user is root ADMIN', function() {
				var element = compileElement();
				element.isolateScope().currentUser = new User();
				element.isolateScope().currentUser.SecurityGroupID = 'ADMIN';
				element.isolateScope().user = new User();
				element.isolateScope().user.ID = 'ADMIN';
				expect(element.isolateScope().controls.LoginConflict.disabled()).toBe(true);
			});
			
			it('is not disabled if current user is ADMIN and user is not root ADMIN', function() {
				var element = compileElement();
				element.isolateScope().currentUser = new User();
				element.isolateScope().currentUser.SecurityGroupID = 'ADMIN';
				element.isolateScope().user = new User();
				element.isolateScope().user.ID = 'JWOJTK';
				expect(element.isolateScope().controls.LoginConflict.disabled()).toBe(false);
			});
		});
	
		describe('logoff', function() {
			it('calls user.forceLogoff', function() {
				var element = compileElement();
				element.isolateScope().user = new User();
				spyOn(element.isolateScope().user, 'forceLogoff').andReturn(getEmptyPromise());
				
				element.isolateScope().controls.logoff.click();
				expect(element.isolateScope().user.forceLogoff).toHaveBeenCalled();
			});
			
			it('calls alert trigger on failure', inject(function($timeout) {
				var element, response;
				element = compileElement();
				response = {status: 400, data:{Message: 'User could not be logged off.'}};
				
				element.isolateScope().user = new User();
				spyOn(element.isolateScope().user, 'forceLogoff').andReturn(getUnsuccessfulPromise(response));
				spyOn(element.isolateScope(), 'miHttpAlertTrigger');
				
				element.isolateScope().controls.logoff.click();
				
				$timeout.flush();
				
				expect(element.isolateScope().miHttpAlertTrigger).toHaveBeenCalledWith(response.status, response.data);
			}));
			
			it('is shown if the current user is in the ADMIN SecurityGroup', function() {
				var element = compileElement();
				element.isolateScope().currentUser = new User();
				element.isolateScope().currentUser.SecurityGroupID = 'ADMIN';
				expect(element.isolateScope().controls.logoff.show()).toBe(true);
			});
			
			it('is hidden if the current user is not in the ADMIN SecurityGroup', function() {
				var element = compileElement();
				element.isolateScope().currentUser = new User();
				element.isolateScope().currentUser.SecurityGroupID = 'USER';
				expect(element.isolateScope().controls.logoff.show()).toBe(false);
			});
		});
		
		describe('Password', function() {
			it('is required when adding a new user', function() {
				scope.mode = ViewModes.add;
				expect(compileElement().isolateScope().controls.Password.required()).toBe(true);
			});
			
			it('is not required when not adding a new user', function() {
				scope.mode = ViewModes.edit;
				expect(compileElement().isolateScope().controls.Password.required()).toBe(false);
			});
		});
	
		describe('ResetPasswordOption', function() {
			it('is disabled when current user is not in the ADMIN SecurityGroup', function() {
				var element = compileElement();
				element.isolateScope().currentUser = new User();
				element.isolateScope().currentUser.SecurityGroupID = 'USER';
				expect(element.isolateScope().controls.ResetPasswordOption.disabled()).toBe(true);
			});
			
			it('is not disabled when current user is in the ADMIN SecurityGroup', function() {
				var element = compileElement();
				element.isolateScope().currentUser = new User();
				element.isolateScope().currentUser.SecurityGroupID = 'ADMIN';
				expect(element.isolateScope().controls.ResetPasswordOption.disabled()).toBe(false);
			});
		});
	
		describe('SecurityQuestion', function() {
			it('is not required when security answer is not required during password recovery, login, or during login conflicts', function() {
				var element = compileElement();
				element.isolateScope().user = new User();
				element.isolateScope().user.RequireResetPasswordSecAnswer = false;
				element.isolateScope().user.AskSecurityQuestionOnLogin = 0;
				element.isolateScope().user.LoginConflict = 0;
				expect(element.isolateScope().controls.SecurityQuestion.required()).toBe(false);
			});
		
			it('is required when security answer is required during password recovery', function() {
				var element = compileElement();
				element.isolateScope().user = new User();
				element.isolateScope().user.RequireResetPasswordSecAnswer = true;
				element.isolateScope().user.AskSecurityQuestionOnLogin = 0;
				element.isolateScope().user.LoginConflict = 0;
				expect(element.isolateScope().controls.SecurityQuestion.required()).toBe(true);
			});
			
			it('is required when security answer is persisted after first login', function() {
				var element = compileElement();
				element.isolateScope().user = new User();
				element.isolateScope().user.RequireResetPasswordSecAnswer = false;
				element.isolateScope().user.AskSecurityQuestionOnLogin = 1;
				element.isolateScope().user.LoginConflict = 0;
				expect(element.isolateScope().controls.SecurityQuestion.required()).toBe(true);
			});
			
			it('is required when security answer should be asked on every login', function() {
				var element = compileElement();
				element.isolateScope().user = new User();
				element.isolateScope().user.RequireResetPasswordSecAnswer = false;
				element.isolateScope().user.AskSecurityQuestionOnLogin = 2;
				element.isolateScope().user.LoginConflict = 0;
				expect(element.isolateScope().controls.SecurityQuestion.required()).toBe(true);
			});
			
			it('is required when login conflicts are resolved with the security answer', function() {
				var element = compileElement();
				element.isolateScope().user = new User();
				element.isolateScope().user.RequireResetPasswordSecAnswer = false;
				element.isolateScope().user.AskSecurityQuestionOnLogin = 0;
				element.isolateScope().user.LoginConflict = 2;
				expect(element.isolateScope().controls.SecurityQuestion.required()).toBe(true);
			});
		});
	
		describe('SecurityAnswer', function() {
			it('is not required when SecurityQuestion doesn\'t exist, and isn\'t required', function() {
				var element = compileElement();
				spyOn(element.isolateScope().controls.SecurityQuestion, 'required').andReturn(false);
				element.isolateScope().user = new User();
				element.isolateScope().user.SecurityQuestion = '';
				expect(element.isolateScope().controls.SecurityAnswer.required()).toBe(false);
			});
		});
	});
});
