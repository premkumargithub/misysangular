'use strict';

describe('Directive: miBomPanel', function () {

  // load the directive's module
  beforeEach(module('voyagerUiApp'));
  beforeEach(module('uiRouterNoop'));
  beforeEach(module('mockResources'));
  beforeEach(module('mockResourcePanel'));

  var compileElement, scope, Boms, q;

  beforeEach(inject(function ($compile, $q, $rootScope, $templateCache, $timeout, _Boms_, ViewModes) {
		$templateCache.put('views/directives/mi-panels/mi-panel.html', '<div></div>');
		
		compileElement = function() {
			var element = $compile(angular.element(
				'<mi-bom-panel '+
					'resource-id="ResourceID" '+
					'mode="mode" '+
					'parent-state="parentState" '+
				'></mi-bom-panel>'
			))(scope);
			
			$rootScope.$apply();
			$timeout.flush();
		
			return element;
		};
	
		scope = $rootScope.$new();
		scope.ResourceID = 'abc-123';
		scope.mode = ViewModes.readonly;
		scope.parentState = 'base.home.test.spec';
		
		Boms = _Boms_;
		q = $q;
  }));
	
	it('saves resourceObj to scope', function() {
		expect(compileElement().isolateScope().resourcesObj).toBeDefined();
  });
	
	it('has a getNew request', function() {
		var mockedPromise, returnValue;
		mockedPromise = q.defer().promise;
		
		spyOn(Boms, 'getNew').andReturn(mockedPromise);
		returnValue = compileElement().isolateScope().getNew();
		
    expect(Boms.getNew).toHaveBeenCalledWith();
    expect(returnValue).toBe(mockedPromise);
  });
	
	it('has a get request encapsulating the ResourceID', function() {
		var mockedPromise, returnValue;
		mockedPromise = q.defer().promise;
		
		spyOn(Boms, 'get').andReturn(mockedPromise);
		returnValue = compileElement().isolateScope().get();
		
    expect(Boms.get).toHaveBeenCalledWith('abc-123');
		expect(returnValue).toBe(mockedPromise);
  });
	
	it('has a delete request encapsulating the ResourceID', function() {
		var mockedPromise, returnValue;
		mockedPromise = q.defer().promise;
		
		spyOn(Boms, 'delete').andReturn(mockedPromise);
		returnValue = compileElement().isolateScope().delete();
		
    expect(Boms.delete).toHaveBeenCalledWith('abc-123');
		expect(returnValue).toBe(mockedPromise);
  });
	
	it('has a save request which passes data', function() {
		var element, bomData, mockedPromise, returnValue;
		bomData = {ResourceID : scope.ResourceID};
		element = compileElement();
		mockedPromise = q.defer().promise;
		
		spyOn(Boms, 'save').andReturn(mockedPromise);
		returnValue = element.isolateScope().save(bomData);
		
    expect(Boms.save).toHaveBeenCalledWith(bomData);
		expect(returnValue).toBe(mockedPromise);
  });
	
	it('has an update request which passes data', function() {
		var element, bomData, mockedPromise, returnValue;
		element = compileElement();
		bomData = {ResourceID : scope.ResourceID};
		mockedPromise = q.defer().promise;
		
		spyOn(Boms, 'update').andReturn(mockedPromise);
		returnValue = element.isolateScope().update(bomData);
		
    expect(Boms.update).toHaveBeenCalledWith(bomData);
		expect(returnValue).toBe(mockedPromise);
  });
	
	it('has an array of tabs that each have a "name" and "templateUrl" property', function() {
		angular.forEach(compileElement().isolateScope().tabs, function(tab) {
			expect(tab.name).toBeDefined();
			expect(tab.templateUrl).toBeDefined();
		});
	});
});
