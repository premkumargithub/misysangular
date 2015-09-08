'use strict';

describe('Controller: AdminUsersCtrl', function() {

	// load the controller's module
	beforeEach(module('voyagerUiApp'));
	beforeEach(module('mockResolves'));
	beforeEach(module('mockResources'));

	var AdminUsersCtrl,
		scope;

	// Initialize the controller and a mock scope
	beforeEach(inject(function($controller, $rootScope) {
		scope = $rootScope.$new();
		AdminUsersCtrl = $controller('AdminUsersCtrl', {
			$scope: scope
		});
	}));

	it('should attach data grid controls to scope', function() {
		expect(scope.onSelect).toBeDefined();
	});
});
