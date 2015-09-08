'use strict';

describe('Controller: ItemsSelectionCtrl', function () {

  // load the controller's module
  beforeEach(module('voyagerUiApp'));

  var ItemsSelectionCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $stateParams) {
		$stateParams.ResourceID = 'mockResourceID';
		$stateParams.mode = 'edit';
	
		scope = $rootScope.$new();
    ItemsSelectionCtrl = $controller('ItemsSelectionCtrl', {
      $scope: scope
    });
  }));
	
	it('should attach a mode and ResourceID to the scope', function () {
    expect(scope.mode).toBeDefined();
    expect(scope.ResourceID).toBeDefined();
  });
});
