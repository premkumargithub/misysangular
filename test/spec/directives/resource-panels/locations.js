'use strict';

describe('Directive: miLocationPanel', function () {

  // load the directive's module
  beforeEach(module('voyagerUiApp'));
  beforeEach(module('uiRouterNoop'));
  beforeEach(module('mockResources'));
  beforeEach(module('mockResourcePanel'));

  var compileElement, scope, Locations, q;

  beforeEach(inject(function ($compile, $q, $rootScope, $templateCache, $timeout, _Locations_, ViewModes) {
		$templateCache.put('views/directives/mi-panels/mi-panel.html', '<div></div>');
		
		compileElement = function() {
			var element = $compile(angular.element(
				'<mi-location-panel '+
					'resource-id="ResourceID" '+
					'mode="mode" '+
					'parent-state="parentState" '+
				'></mi-location-panel>'
			))(scope);
			
			$rootScope.$apply();
			$timeout.flush();
		
			return element;
		};
	
		scope = $rootScope.$new();
		scope.ResourceID = 'abc-123';
		scope.mode = ViewModes.readonly;
		scope.parentState = 'base.home.test.spec';
		
		Locations = _Locations_;
		q = $q;
  }));
	
	it('saves resourceObj to scope', function() {
		expect(compileElement().isolateScope().resourcesObj).toBeDefined();
  });
	
	it('has a getNew request', function() {
		var mockedPromise, returnValue;
		mockedPromise = q.defer().promise;
		
		spyOn(Locations, 'getNew').andReturn(mockedPromise);
		returnValue = compileElement().isolateScope().getNew();
		
    expect(Locations.getNew).toHaveBeenCalledWith();
    expect(returnValue).toBe(mockedPromise);
  });
	
	it('has a get request encapsulating the ResourceID', function() {
		var mockedPromise, returnValue;
		mockedPromise = q.defer().promise;
		
		spyOn(Locations, 'get').andReturn(mockedPromise);
		returnValue = compileElement().isolateScope().get();
		
    expect(Locations.get).toHaveBeenCalledWith('abc-123');
		expect(returnValue).toBe(mockedPromise);
  });
	
	it('has a delete request encapsulating the ResourceID', function() {
		var mockedPromise, returnValue;
		mockedPromise = q.defer().promise;
		
		spyOn(Locations, 'delete').andReturn(mockedPromise);
		returnValue = compileElement().isolateScope().delete();
		
    expect(Locations.delete).toHaveBeenCalledWith('abc-123');
		expect(returnValue).toBe(mockedPromise);
  });
	
	it('has a save request which passes data', function() {
		var element, locationData, mockedPromise, returnValue;
		locationData = {ResourceID : scope.ResourceID};
		element = compileElement();
		mockedPromise = q.defer().promise;
		
		spyOn(Locations, 'save').andReturn(mockedPromise);
		returnValue = element.isolateScope().save(locationData);
		
    expect(Locations.save).toHaveBeenCalledWith(locationData);
		expect(returnValue).toBe(mockedPromise);
  });
	
	it('has an update request which passes data', function() {
		var element, locationData, mockedPromise, returnValue;
		element = compileElement();
		locationData = {ResourceID : scope.ResourceID};
		mockedPromise = q.defer().promise;
		
		spyOn(Locations, 'update').andReturn(mockedPromise);
		returnValue = element.isolateScope().update(locationData);
		
    expect(Locations.update).toHaveBeenCalledWith(locationData);
		expect(returnValue).toBe(mockedPromise);
  });
	
	it('has an array of tabs that each have a "name" and "templateUrl" property', function() {
		angular.forEach(compileElement().isolateScope().tabs, function(tab) {
			expect(tab.name).toBeDefined();
			expect(tab.templateUrl).toBeDefined();
		});
	});
});
