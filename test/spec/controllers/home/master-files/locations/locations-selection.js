'use strict';

describe('Controller: MasterFilesLocationsSelectionCtrl', function () {

  // load the controller's module
  beforeEach(module('voyagerUiApp'));

  var MasterFilesLocationsSelectionCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $stateParams) {
		$stateParams.ResourceID = 'mockResourceID';
		$stateParams.mode = 'edit';
	
    scope = $rootScope.$new();
    MasterFilesLocationsSelectionCtrl = $controller('MasterFilesLocationsSelectionCtrl', {
      $scope: scope
    });
  }));
	
	it('should attach a mode and ResourceID to the scope', function () {
    expect(scope.mode).toBeDefined();
    expect(scope.ResourceID).toBeDefined();
  });
});
