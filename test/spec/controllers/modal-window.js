/* global waitsFor */
/* global runs */

'use strict';

describe('Controller: ModalWindowCtrl', function () {

  // load the controller's module
  beforeEach(module('voyagerUiApp'));
  beforeEach(module('uiRouterNoop'));

  var ModalWindowCtrl,
    scope,
		q;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $q) {
    scope = $rootScope.$new();
		scope.closeWindow = angular.noop;
    ModalWindowCtrl = $controller('ModalWindowCtrl', {
      $scope: scope
    });
		
		q = $q;
  }));
	
	it('adds activePromises when calling addPromise', function() {
		var deferredPromise = q.defer();
		expect(scope.activePromises).toBe(0);
		
		scope.addPromise(deferredPromise.promise);
		expect(scope.activePromises).toBe(1);
	});
	
	it('adds activePromises when calling addPromise', function() {
		var deferredPromise = q.defer();
		scope.addPromise(deferredPromise.promise);
		expect(scope.activePromises).toBe(1);
		
		deferredPromise.resolve('');
		waitsFor(function() {
			scope.$digest();
			return scope.activePromises === 0;
		}, 'minimum loading time to be reached', scope.minLoadingTime+(scope.minLoadingTime*0.25));
		
		runs(function() {
			expect(scope.activePromises).toBe(0);
		});
	});
	
	/* $timeout isn't triggered
	it('adds message to queue when calling addMessage', function() {
		expect(scope.messages.length).toBe(0);
		scope.addMessage('Test message', [{'ok': angular.noop}]);
		scope.$apply();
		scope.$apply();
		expect(scope.messages.length).toBe(1);
	});*/
});
