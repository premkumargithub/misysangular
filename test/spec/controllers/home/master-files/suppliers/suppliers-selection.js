'use strict';

describe('Controller: SuppliersSelectionCtrl', function () {

  // load the controller's module
  beforeEach(module('voyagerUiApp'));

  var SuppliersSelectionCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $stateParams) {
		$stateParams.ResourceID = 'mockResourceID';
		$stateParams.mode = 'edit';
	
    scope = $rootScope.$new();
    SuppliersSelectionCtrl = $controller('SuppliersSelectionCtrl', {
      $scope: scope
    });
  }));
	
	it('should attach a mode and ResourceID to the scope', function () {
    expect(scope.mode).toBeDefined();
    expect(scope.ResourceID).toBeDefined();
    expect(scope.ResourceID).toBe('mockResourceID');
    expect(scope.ResourceID).toBe('edit');
  });

  it('should attach a parentState to the scope', function () {
    expect(scope.parentState).toBeDefined();
  });

  it('should attach a parentState to the scope', function () {
    expect(scope.parentState).toBeDefined();
  });

  it('should attach data grid onDelete controls to scope', function() {
    expect(scope.onDelete).toBeDefined();
  });

  it('should attach data grid onSave controls to scope', function() {
    expect(scope.onSave).toBeDefined();
  });
});
