'use strict';

describe('Controller: AdminDepartmentsCtrl', function() {

	// load the controller's module
	beforeEach(module('voyagerUiApp'));
	beforeEach(module('mockResolves'));
	beforeEach(module('mockResources'));

	var AdminDepartmentsCtrl,
		scope;

	// Initialize the controller and a mock scope
	beforeEach(inject(function($controller, $rootScope) {
		scope = $rootScope.$new();
		AdminDepartmentsCtrl = $controller('AdminDepartmentsCtrl', {
			$scope: scope
		});
	}));

	it('should attach data grid controls to scope', function() {
		expect(scope.onSelect).toBeDefined();
	});
});
