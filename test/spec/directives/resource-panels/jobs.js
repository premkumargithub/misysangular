'use strict';

describe('Directive: miJobPanel', function () {

  // load the directive's module
  beforeEach(module('voyagerUiApp'));
  beforeEach(module('uiRouterNoop'));
  beforeEach(module('mockResources'));
  beforeEach(module('mockResourcePanel'));

  var compileElement, scope, Jobs, q;

  beforeEach(inject(function ($compile, $q, $rootScope, $templateCache, $timeout, _Jobs_, ViewModes) {
		$templateCache.put('views/directives/mi-panels/mi-panel.html', '<div></div>');
		
		compileElement = function() {
			var element = $compile(angular.element(
				'<mi-job-panel '+
					'resource-id="ResourceID" '+
					'mode="mode" '+
					'parent-state="parentState" '+
				'></mi-job-panel>'
			))(scope);
			
			spyOn(Jobs, 'getJobDetails').andReturn($q.defer().promise);
			
			$rootScope.$apply();
			$timeout.flush();
			
			expect(Jobs.getJobDetails).toHaveBeenCalledWith(scope.ResourceID);
		
			return element;
		};
	
		scope = $rootScope.$new();
		scope.ResourceID = 'abc-123';
		scope.mode = ViewModes.readonly;
		scope.parentState = 'base.home.test.spec';
		
		Jobs = _Jobs_;
		q = $q;
  }));
	
	it('saves resourceObj to scope', function() {
		expect(compileElement().isolateScope().resourcesObj).toBeDefined();
  });
	
	it('has a getNew request', function() {
		var mockedPromise, returnValue;
		mockedPromise = q.defer().promise;
		
		spyOn(Jobs, 'getNew').andReturn(mockedPromise);
		returnValue = compileElement().isolateScope().getNew();
		
    expect(Jobs.getNew).toHaveBeenCalledWith();
    expect(returnValue).toBe(mockedPromise);
  });
	
	it('has a get request encapsulating the ResourceID', function() {
		var mockedPromise, returnValue;
		mockedPromise = q.defer().promise;
		
		spyOn(Jobs, 'get').andReturn(mockedPromise);
		returnValue = compileElement().isolateScope().get();
		
    expect(Jobs.get).toHaveBeenCalledWith('abc-123');
		expect(returnValue).toBe(mockedPromise);
  });
	
	it('has a delete request encapsulating the ResourceID', function() {
		var mockedPromise, returnValue;
		mockedPromise = q.defer().promise;
		
		spyOn(Jobs, 'delete').andReturn(mockedPromise);
		returnValue = compileElement().isolateScope().delete();
		
    expect(Jobs.delete).toHaveBeenCalledWith('abc-123');
		expect(returnValue).toBe(mockedPromise);
  });
	
	it('has a save request which passes data', function() {
		var element, jobData, mockedPromise, returnValue;
		jobData = {ResourceID : scope.ResourceID};
		element = compileElement();
		mockedPromise = q.defer().promise;
		
		spyOn(Jobs, 'save').andReturn(mockedPromise);
		returnValue = element.isolateScope().save(jobData);
		
    expect(Jobs.save).toHaveBeenCalledWith(jobData);
		expect(returnValue).toBe(mockedPromise);
  });
	
	it('has an update request which passes data', function() {
		var element, jobData, mockedPromise, returnValue;
		element = compileElement();
		jobData = {ResourceID : scope.ResourceID};
		mockedPromise = q.defer().promise;
		
		spyOn(Jobs, 'update').andReturn(mockedPromise);
		returnValue = element.isolateScope().update(jobData);
		
    expect(Jobs.update).toHaveBeenCalledWith(jobData);
		expect(returnValue).toBe(mockedPromise);
  });
	
	it('has an array of tabs that each have a "name" and "templateUrl" property', function() {
		angular.forEach(compileElement().isolateScope().tabs, function(tab) {
			expect(tab.name).toBeDefined();
			expect(tab.templateUrl).toBeDefined();
		});
	});
});
