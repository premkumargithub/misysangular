'use strict';

describe('Directive: miItemPanel', function () {

  // load the directive's module
  beforeEach(module('voyagerUiApp'));
  beforeEach(module('uiRouterNoop'));
  beforeEach(module('mockResources'));
  beforeEach(module('mockResourcePanel'));

  var compileElement, scope, Items, q;

  beforeEach(inject(function ($compile, $q, $rootScope, $templateCache, $timeout, _Items_, ViewModes) {
		$templateCache.put('views/directives/mi-panels/mi-panel.html', '<div></div>');
		
		compileElement = function() {
			var element = $compile(angular.element(
				'<mi-item-panel '+
					'resource-id="ResourceID" '+
					'mode="mode" '+
					'parent-state="parentState" '+
				'></mi-item-panel>'
			))(scope);
			
			spyOn(Items, 'getValuations').andReturn($q.defer().promise);
			
			$rootScope.$apply();
			$timeout.flush();
			
			expect(Items.getValuations).toHaveBeenCalledWith(scope.ResourceID);
		
			return element;
		};
	
		scope = $rootScope.$new();
		scope.ResourceID = 'abc-123';
		scope.mode = ViewModes.readonly;
		scope.parentState = 'base.home.test.spec';
		
		Items = _Items_;
		q = $q;
  }));
	
	it('saves resourceObj to scope', function() {
		expect(compileElement().isolateScope().resourcesObj).toBeDefined();
  });
	
	it('has a getNew request', function() {
		var mockedPromise, returnValue;
		mockedPromise = q.defer().promise;
		
		spyOn(Items, 'getNew').andReturn(mockedPromise);
		returnValue = compileElement().isolateScope().getNew();
		
    expect(Items.getNew).toHaveBeenCalledWith();
    expect(returnValue).toBe(mockedPromise);
  });
	
	it('has a get request encapsulating the ResourceID', function() {
		var mockedPromise, returnValue;
		mockedPromise = q.defer().promise;
		
		spyOn(Items, 'get').andReturn(mockedPromise);
		returnValue = compileElement().isolateScope().get();
		
    expect(Items.get).toHaveBeenCalledWith('abc-123');
		expect(returnValue).toBe(mockedPromise);
  });
	
	it('has a delete request encapsulating the ResourceID', function() {
		var mockedPromise, returnValue;
		mockedPromise = q.defer().promise;
		
		spyOn(Items, 'delete').andReturn(mockedPromise);
		returnValue = compileElement().isolateScope().delete();
		
    expect(Items.delete).toHaveBeenCalledWith('abc-123');
		expect(returnValue).toBe(mockedPromise);
  });
	
	it('has a save request which passes data', function() {
		var element, itemData, mockedPromise, returnValue;
		itemData = {ResourceID : scope.ResourceID};
		element = compileElement();
		mockedPromise = q.defer().promise;
		
		spyOn(Items, 'save').andReturn(mockedPromise);
		returnValue = element.isolateScope().save(itemData);
		
    expect(Items.save).toHaveBeenCalledWith(itemData);
		expect(returnValue).toBe(mockedPromise);
  });
	
	it('has an update request which passes data', function() {
		var element, itemData, mockedPromise, returnValue;
		element = compileElement();
		itemData = {ResourceID : scope.ResourceID};
		mockedPromise = q.defer().promise;
		
		spyOn(Items, 'update').andReturn(mockedPromise);
		returnValue = element.isolateScope().update(itemData);
		
    expect(Items.update).toHaveBeenCalledWith(itemData);
		expect(returnValue).toBe(mockedPromise);
  });
	
	it('has an array of tabs that each have a "name" and "templateUrl" property', function() {
		angular.forEach(compileElement().isolateScope().tabs, function(tab) {
			expect(tab.name).toBeDefined();
			expect(tab.templateUrl).toBeDefined();
		});
	});
});
