'use strict';

describe('Directive: miResourcePanel', function () {

  // load the directive's module
  beforeEach(module('voyagerUiApp'));
  beforeEach(module('uiRouterNoop'));

  var compileElement, contentTemplate, getEmptyPromise, getUnsuccessfulPromise, getSuccessfulPromise, q, scope;
  beforeEach(inject(function ($compile, $q, $rootScope, $templateCache, $timeout) {
		contentTemplate = 'viewsdirectivestemplate.html';
		$templateCache.put(contentTemplate, '<form name="panelForm></form>');
		
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
		
		scope = $rootScope.$new();
		scope.resourceName = 'resource';
		scope.get = getEmptyPromise;
		scope.delete = getEmptyPromise;
		scope.save = getEmptyPromise;
		scope.update = getEmptyPromise;
		scope.parentState = 'base.home.sweet.home';
		scope.miHttpAlertTrigger = angular.noop;
		scope.tabs = [{name:'', templateUrl:contentTemplate}];
		
		compileElement = function(scope) {
			var element = $compile(
				$templateCache.get('views/directives/mi-panels/generic-panel.html')
			)(scope);
			
			$rootScope.$apply();
			$timeout.flush();
			
			return element.scope().$$childHead;
		};
		
		q = $q;
  }));
	
	describe('Readonly mode', function() {
		beforeEach(inject(function(ViewModes) {
			scope.mode = ViewModes.readonly;
			scope.get = getEmptyPromise;
		}));
		
		describe('Initial get', function() {
			it('calls the parent "get" function to get resource data', function() {
				spyOn(scope, 'get').andReturn(getEmptyPromise());
				compileElement(scope);
				expect(scope.get).toHaveBeenCalled();
			});
			
			it('places resource data by "resourceName" on the parent scope', function() {
				var responseData, successfulPromise;
				
				responseData = {data: {qwe:123}};
				successfulPromise = function() {
					var deferment = q.defer();
					
					deferment.resolve(responseData);
					
					return deferment.promise;
				};
				
				spyOn(scope, 'get').andReturn(successfulPromise());
				compileElement(scope);
				expect(scope[scope.resourceName]).toBe(responseData.data);
			});
		});
		
		describe('Delete button', function() {
			it('calls the parent "delete" function when the delete button is pressed', function() {
				var returnedPromise, mockedPromise;
				mockedPromise = getEmptyPromise();
				
				spyOn(scope, 'delete').andReturn(mockedPromise);
				returnedPromise = compileElement(scope).btnDelete();
				expect(returnedPromise).toBe(mockedPromise);
			});
			
			it('leaves to "parentState" when the resource is deleted successfully', inject(function($state, $timeout) {
				var successfulPromise = getSuccessfulPromise({});
				
				spyOn(scope, 'delete').andReturn(successfulPromise);
				spyOn($state, 'go');
				compileElement(scope).btnDelete();
				$timeout.flush();
				expect($state.go).toHaveBeenCalledWith(scope.parentState);
			}));
			
			it('calls miHttpAlerts when the resource is not deleted successfully', inject(function($state, $timeout) {
				var element, elementScope, responseData, unsuccessfulPromise;
				responseData = {status: 400, data: {Message: 'You goofed'}};
				unsuccessfulPromise = getUnsuccessfulPromise(responseData);
				
				spyOn(scope, 'delete').andReturn(unsuccessfulPromise);
				element = compileElement(scope);
				elementScope = element;
				spyOn(elementScope, 'miHttpAlertTrigger');
				
				element.btnDelete();
				$timeout.flush();
				
				expect(elementScope.miHttpAlertTrigger).toHaveBeenCalledWith(responseData.status, responseData.data);
			}));
		});
		
		describe('Cancel button', function() {
			it('leaves to "parentState" when the cancel button is pressed', inject(function($state) {
				var returnedPromise, mockedPromise;
				mockedPromise = getEmptyPromise();
				
				spyOn($state, 'go');
				returnedPromise = compileElement(scope).btnCancel();
				expect($state.go).toHaveBeenCalledWith(scope.parentState);
			}));
		});
	
		describe('Save button', function() {
			it('calls update with the existing data', function() {
				var returnedPromise, mockedPromise;
				mockedPromise = getEmptyPromise();
				
				spyOn(scope, 'update').andReturn(mockedPromise);
				returnedPromise = compileElement(scope).btnSave();
				expect(returnedPromise).toBe(mockedPromise);
			});
			
			it('success sets parent resource data', inject(function($timeout) {
				var response, successfulPromise;
				response = {data: {abc: 123}};
				successfulPromise = getSuccessfulPromise(response);
				
				spyOn(scope, 'update').andReturn(successfulPromise);
				compileElement(scope).btnSave();
				$timeout.flush();
				expect(scope[scope.resourceName]).toBe(response.data);
			}));
			
			it('success sets form state to pristine', inject(function($timeout) {
				var element, response, successfulPromise;
				response = {data: {abc: 123}};
				successfulPromise = getSuccessfulPromise(response);
				spyOn(scope, 'update').andReturn(successfulPromise);
				element = compileElement(scope);
				spyOn(element.panelForm, '$setPristine');
				
				element.btnSave();
				$timeout.flush();
				
				expect(element.panelForm.$setPristine).toHaveBeenCalled();
			}));
			
			it('failure calls miHttpAlert', inject(function($timeout) {
				var element, elementScope, responseData, unsuccessfulPromise;
				responseData = {status: 400, data: {Message: 'You goofed'}};
				unsuccessfulPromise = getUnsuccessfulPromise(responseData);
				
				spyOn(scope, 'update').andReturn(unsuccessfulPromise);
				element = compileElement(scope);
				elementScope = element;
				spyOn(elementScope, 'miHttpAlertTrigger');
				
				element.btnSave();
				$timeout.flush();
				
				expect(elementScope.miHttpAlertTrigger).toHaveBeenCalledWith(responseData.status, responseData.data);
			}));
		});
	});
	
	describe('Edit mode', function() {
		beforeEach(inject(function(ViewModes) {
			scope.mode = ViewModes.edit;
			scope.get = getEmptyPromise;
		}));
		
		describe('Initial get', function() {
			it('calls the parent "get" function to get resource data', function() {
				spyOn(scope, 'get').andReturn(getEmptyPromise());
				compileElement(scope);
				expect(scope.get).toHaveBeenCalled();
			});
			
			it('places resource data by "resourceName" on the parent scope', function() {
				var responseData = {data: {qwe:123}};
				
				spyOn(scope, 'get').andReturn(getSuccessfulPromise(responseData));
				compileElement(scope);
				expect(scope[scope.resourceName]).toBe(responseData.data);
			});
		});
		
		describe('Delete button', function() {
			it('calls the parent "delete" function when the delete button is pressed', function() {
				var returnedPromise, mockedPromise;
				mockedPromise = getEmptyPromise();
				
				spyOn(scope, 'delete').andReturn(mockedPromise);
				returnedPromise = compileElement(scope).btnDelete();
				expect(returnedPromise).toBe(mockedPromise);
			});
			
			it('leaves to "parentState" when the resource is deleted successfully', inject(function($state, $timeout) {
				var successfulPromise = getSuccessfulPromise({});
				
				spyOn(scope, 'delete').andReturn(successfulPromise);
				spyOn($state, 'go');
				compileElement(scope).btnDelete();
				$timeout.flush();
				expect($state.go).toHaveBeenCalledWith(scope.parentState);
			}));
			
			it('calls miHttpAlerts when the resource is not deleted successfully', inject(function($state, $timeout) {
				var element, elementScope, responseData, unsuccessfulPromise;
				responseData = {status: 400, data: {Message: 'You goofed'}};
				unsuccessfulPromise = getUnsuccessfulPromise(responseData);
				
				spyOn(scope, 'delete').andReturn(unsuccessfulPromise);
				element = compileElement(scope);
				elementScope = element;
				spyOn(elementScope, 'miHttpAlertTrigger');
				
				element.btnDelete();
				$timeout.flush();
				
				expect(elementScope.miHttpAlertTrigger).toHaveBeenCalledWith(responseData.status, responseData.data);
			}));
		});
		
		describe('Cancel button', function() {
			it('leaves to "parentState" when the cancel button is pressed', inject(function($state) {
				var returnedPromise, mockedPromise;
				mockedPromise = getEmptyPromise();
				
				spyOn($state, 'go');
				returnedPromise = compileElement(scope).btnCancel();
				expect($state.go).toHaveBeenCalledWith(scope.parentState);
			}));
		});
	
		describe('Save button', function() {
			it('calls update with the existing data', function() {
				var returnedPromise, mockedPromise;
				mockedPromise = getEmptyPromise();
				
				spyOn(scope, 'update').andReturn(mockedPromise);
				returnedPromise = compileElement(scope).btnSave();
				expect(returnedPromise).toBe(mockedPromise);
			});
			
			it('success sets parent resource data', inject(function($timeout) {
				var response, successfulPromise;
				response = {data: {abc: 123}};
				successfulPromise = getSuccessfulPromise(response);
				
				spyOn(scope, 'update').andReturn(successfulPromise);
				compileElement(scope).btnSave();
				$timeout.flush();
				expect(scope[scope.resourceName]).toBe(response.data);
			}));
			
			it('success sets form state to pristine', inject(function($timeout) {
				var element, response, successfulPromise;
				response = {data: {abc: 123}};
				successfulPromise = getSuccessfulPromise(response);
				spyOn(scope, 'update').andReturn(successfulPromise);
				element = compileElement(scope);
				spyOn(element.panelForm, '$setPristine');
				
				element.btnSave();
				$timeout.flush();
				
				expect(element.panelForm.$setPristine).toHaveBeenCalled();
			}));
			
			it('failure calls miHttpAlert', inject(function($timeout) {
				var element, elementScope, responseData, unsuccessfulPromise;
				responseData = {status: 400, data: {Message: 'You goofed'}};
				unsuccessfulPromise = getUnsuccessfulPromise(responseData);
				
				spyOn(scope, 'update').andReturn(unsuccessfulPromise);
				element = compileElement(scope);
				elementScope = element;
				spyOn(elementScope, 'miHttpAlertTrigger');
				
				element.btnSave();
				$timeout.flush();
				
				expect(elementScope.miHttpAlertTrigger).toHaveBeenCalledWith(responseData.status, responseData.data);
			}));
		});
	});
	
	describe('Add mode', function() {
		beforeEach(inject(function(ViewModes) {
			scope.mode = ViewModes.add;
			scope.getNew = function() { return {qwe:123}; };
		}));
		
		describe('Initial get', function() {
			it('calls the parent "getNew" function to get resource data', function() {
				var data = {qwe:123};
				
				spyOn(scope, 'getNew').andReturn(data);
				compileElement(scope);
				expect(scope.getNew).toHaveBeenCalled();
			});
			
			it('places resource data by "resourceName" on the parent scope', function() {
				var data = {qwe:123};
				
				spyOn(scope, 'getNew').andReturn(data);
				compileElement(scope);
				expect(scope[scope.resourceName]).toBe(data);
			});
		});
		
		describe('Delete button', function() {
			it('leaves to "parentState" when the delete button is pressed', inject(function($state) {
				var returnedPromise, mockedPromise;
				mockedPromise = getEmptyPromise();
				
				spyOn($state, 'go');
				returnedPromise = compileElement(scope).btnDelete();
				expect($state.go).toHaveBeenCalledWith(scope.parentState);
			}));
		});
		
		describe('Cancel button', function() {
			it('leaves to "parentState" when the cancel button is pressed', inject(function($state) {
				var returnedPromise, mockedPromise;
				mockedPromise = getEmptyPromise();
				
				spyOn($state, 'go');
				returnedPromise = compileElement(scope).btnCancel();
				expect($state.go).toHaveBeenCalledWith(scope.parentState);
			}));
		});
	
		describe('Save button', function() {
			it('calls save with the existing data', function() {
				var returnedPromise, mockedPromise;
				mockedPromise = getEmptyPromise();
				
				spyOn(scope, 'save').andReturn(mockedPromise);
				returnedPromise = compileElement(scope).btnSave();
				expect(returnedPromise).toBe(mockedPromise);
			});
			
			it('success sets parent resource data', inject(function($state, $timeout) {
				var successfulPromise = getSuccessfulPromise({data: {abc: 123}});
				
				spyOn(scope, 'save').andReturn(successfulPromise);
				spyOn($state, 'go');
				compileElement(scope).btnSave();
				$timeout.flush();
				expect($state.go).toHaveBeenCalled();
			}));
			
			it('success sets form state to pristine', inject(function($timeout) {
				var element, response, successfulPromise;
				response = {data: {abc: 123}};
				successfulPromise = getSuccessfulPromise(response);
				spyOn(scope, 'save').andReturn(successfulPromise);
				element = compileElement(scope);
				spyOn(element.panelForm, '$setPristine');
				
				element.btnSave();
				$timeout.flush();
				
				expect(element.panelForm.$setPristine).toHaveBeenCalled();
			}));
			
			it('failure calls miHttpAlert', inject(function($timeout) {
				var element, elementScope, responseData, unsuccessfulPromise;
				responseData = {status: 400, data: {Message: 'You goofed'}};
				unsuccessfulPromise = getUnsuccessfulPromise(responseData);
				
				spyOn(scope, 'save').andReturn(unsuccessfulPromise);
				element = compileElement(scope);
				elementScope = element;
				spyOn(elementScope, 'miHttpAlertTrigger');
				
				element.btnSave();
				$timeout.flush();
				
				expect(elementScope.miHttpAlertTrigger).toHaveBeenCalledWith(responseData.status, responseData.data);
			}));
		});
	});
});
