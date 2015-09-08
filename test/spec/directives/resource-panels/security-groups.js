'use strict';

describe('Directive: miSecurityGroupPanel', function () {

  // load the directive's module
  beforeEach(module('voyagerUiApp'));
  beforeEach(module('uiRouterNoop'));
  beforeEach(module('mockResources'));
  beforeEach(module('mockResourcePanel'));

  var compileElement, scope, SecurityGroups, q;

  beforeEach(inject(function ($compile, $q, $rootScope, $templateCache, $timeout, _SecurityGroups_, ViewModes) {
		$templateCache.put('views/directives/mi-panels/mi-panel.html', '<div></div>');
		
		compileElement = function() {
			var element = $compile(angular.element(
				'<mi-security-group-panel '+
					'resource-id="ResourceID" '+
					'mode="mode" '+
					'parent-state="parentState" '+
				'></mi-security-group-panel>'
			))(scope);
			
			$rootScope.$apply();
			$timeout.flush();
		
			return element;
		};
	
		scope = $rootScope.$new();
		scope.ResourceID = 'abc-123';
		scope.mode = ViewModes.readonly;
		scope.parentState = 'base.home.test.spec';
		
		SecurityGroups = _SecurityGroups_;
		q = $q;
  }));
	
	it('saves resourceObj to scope', function() {
		expect(compileElement().isolateScope().resourcesObj).toBeDefined();
  });
	
	it('has a getNew request', function() {
		var mockedPromise, returnValue;
		mockedPromise = q.defer().promise;
		
		spyOn(SecurityGroups, 'getNew').andReturn(mockedPromise);
		returnValue = compileElement().isolateScope().getNew();
		
    expect(SecurityGroups.getNew).toHaveBeenCalledWith();
    expect(returnValue).toBe(mockedPromise);
  });
	
	it('has a get request encapsulating the ResourceID', function() {
		var mockedPromise, returnValue;
		mockedPromise = q.defer().promise;
		
		spyOn(SecurityGroups, 'get').andReturn(mockedPromise);
		returnValue = compileElement().isolateScope().get();
		
    expect(SecurityGroups.get).toHaveBeenCalledWith('abc-123');
		expect(returnValue).toBe(mockedPromise);
  });
	
	it('has a delete request encapsulating the ResourceID', function() {
		var mockedPromise, returnValue;
		mockedPromise = q.defer().promise;
		
		spyOn(SecurityGroups, 'delete').andReturn(mockedPromise);
		returnValue = compileElement().isolateScope().delete();
		
    expect(SecurityGroups.delete).toHaveBeenCalledWith('abc-123');
		expect(returnValue).toBe(mockedPromise);
  });
	
	it('has a save request which passes data', function() {
		var element, securityGroupData, mockedPromise, returnValue;
		securityGroupData = {ResourceID : scope.ResourceID};
		element = compileElement();
		mockedPromise = q.defer().promise;
		
		spyOn(SecurityGroups, 'save').andReturn(mockedPromise);
		returnValue = element.isolateScope().save(securityGroupData);
		
    expect(SecurityGroups.save).toHaveBeenCalledWith(securityGroupData);
		expect(returnValue).toBe(mockedPromise);
  });
	
	it('has an update request which passes data', function() {
		var element, securityGroupData, mockedPromise, returnValue;
		element = compileElement();
		securityGroupData = {ResourceID : scope.ResourceID};
		mockedPromise = q.defer().promise;
		
		spyOn(SecurityGroups, 'update').andReturn(mockedPromise);
		returnValue = element.isolateScope().update(securityGroupData);
		
    expect(SecurityGroups.update).toHaveBeenCalledWith(securityGroupData);
		expect(returnValue).toBe(mockedPromise);
  });
	
	it('has an array of tabs that each have a "name" and "templateUrl" property', function() {
		angular.forEach(compileElement().isolateScope().tabs, function(tab) {
			expect(tab.name).toBeDefined();
			expect(tab.templateUrl).toBeDefined();
		});
	});
});
