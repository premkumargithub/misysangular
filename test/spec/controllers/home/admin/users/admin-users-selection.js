'use strict';

describe('Controller: AdminUsersSelectionCtrl', function() {

	// load the controller's module
	beforeEach(module('voyagerUiApp'));
	beforeEach(module('mockResolves'));
	beforeEach(module('mockResources'));

	var UsersSelectionCtrl, scope;

	// Initialize the controller and a mock scope
	beforeEach(inject(function($controller, $rootScope, $stateParams) {
		$stateParams.ResourceID = 'mockResourceID';
		$stateParams.mode = 'edit';

		scope = $rootScope.$new();
		UsersSelectionCtrl = $controller('AdminUsersSelectionCtrl', {
			$scope: scope
		});
	}));

	it('should attach a mode and ResourceID to the scope', function() {
		expect(scope.mode).toBeDefined();
		expect(scope.ResourceID).toBeDefined();
	});

	it('should attach data grid controls to scope', function() {
		expect(scope.onDelete).toBeDefined();
	});

	it('should attach data grid controls to scope', function() {
		expect(scope.onSave).toBeDefined();
	});
	
});
