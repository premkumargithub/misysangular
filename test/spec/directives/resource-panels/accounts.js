'use strict';

describe('Directive: miAccountPanel', function() {

  // load the directive's module
  beforeEach(module('voyagerUiApp'));
  beforeEach(module('uiRouterNoop'));
  beforeEach(module('mockResources'));
  beforeEach(module('mockResourcePanel'));

  var compileElement, scope, Accounts, q;

  beforeEach(inject(function($compile, $q, $rootScope, $templateCache, $timeout, _Accounts_, ViewModes) {
		$templateCache.put('views/directives/mi-panels/mi-panel.html', '<div></div>');

		compileElement = function() {
			var element = $compile(angular.element(
				 '<mi-account-panel ' +
					'resource-id="ResourceID" ' +
					'mode="mode" ' +
					'parent-state="parentState" ' +
				'></mi-account-panel>'
			))(scope);

			$rootScope.$apply();
			$timeout.flush();

			return element;
		};

		scope = $rootScope.$new();
		scope.ResourceID = 'abc-123';
		scope.mode = ViewModes.readonly;
		scope.parentState = 'base.home.test.spec';

		Accounts = _Accounts_;
		q = $q;
  }));

	it('saves resourceObj to scope', function() {
		expect(compileElement().isolateScope().resourcesObj).toBeDefined();
  });

	it('has a getNew request', function() {
		var mockedPromise, returnValue;
		mockedPromise = q.defer().promise;

		spyOn(Accounts, 'getNew').andReturn(mockedPromise);
		returnValue = compileElement().isolateScope().getNew();

    expect(Accounts.getNew).toHaveBeenCalledWith();
    expect(returnValue).toBe(mockedPromise);
  });

	it('has a get request encapsulating the ResourceID', function() {
		var mockedPromise, returnValue;
		mockedPromise = q.defer().promise;

		spyOn(Accounts, 'get').andReturn(mockedPromise);
		returnValue = compileElement().isolateScope().get();

    expect(Accounts.get).toHaveBeenCalledWith('abc-123');
		expect(returnValue).toBe(mockedPromise);
  });

	it('has a delete request encapsulating the ResourceID', function() {
		var mockedPromise, returnValue;
		mockedPromise = q.defer().promise;

		spyOn(Accounts, 'delete').andReturn(mockedPromise);
		returnValue = compileElement().isolateScope(). delete();

    expect(Accounts.delete).toHaveBeenCalledWith('abc-123');
		expect(returnValue).toBe(mockedPromise);
  });

	it('has a save request which passes data', function() {
		var element, accountData, mockedPromise, returnValue;
		accountData = {ResourceID: scope.ResourceID};
		element = compileElement();
		mockedPromise = q.defer().promise;

		spyOn(Accounts, 'save').andReturn(mockedPromise);
		returnValue = element.isolateScope().save(accountData);

    expect(Accounts.save).toHaveBeenCalledWith(accountData);
		expect(returnValue).toBe(mockedPromise);
  });

	it('has an update request which passes data', function() {
		var element, accountData, mockedPromise, returnValue;
		element = compileElement();
		accountData = {ResourceID: scope.ResourceID};
		mockedPromise = q.defer().promise;

		spyOn(Accounts, 'update').andReturn(mockedPromise);
		returnValue = element.isolateScope().update(accountData);

    expect(Accounts.update).toHaveBeenCalledWith(accountData);
		expect(returnValue).toBe(mockedPromise);
  });

	it('has an array of tabs that each have a "name" and "templateUrl" property', function() {
		angular.forEach(compileElement().isolateScope().tabs, function(tab) {
			expect(tab.name).toBeDefined();
			expect(tab.templateUrl).toBeDefined();
		});
	});
});
