'use strict';

describe('Controller: BomsSelectionCtrl', function () {

  // load the controller's module
  beforeEach(module('voyagerUiApp'));

  var BomSelectionCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $stateParams) {
		$stateParams.ResourceID = 'mockResourceID';
		$stateParams.mode = 'edit';
	
    scope = $rootScope.$new();
    BomSelectionCtrl = $controller('BomsSelectionCtrl', {
      $scope: scope
    });
  }));
	
	it('should attach a mode and ResourceID to the scope', function () {
    expect(scope.mode).toBeDefined();
    expect(scope.ResourceID).toBeDefined();
  });
});
