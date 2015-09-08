'use strict';

describe('Controller: JobsSelectionCtrl', function () {

  // load the controller's module
  beforeEach(module('voyagerUiApp'));

  var JobsSelectionCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $stateParams) {
		$stateParams.ResourceID = 'mockResourceID';
		$stateParams.mode = 'edit';
	
    scope = $rootScope.$new();
    JobsSelectionCtrl = $controller('JobsSelectionCtrl', {
      $scope: scope
    });
  }));
	
	it('should attach a mode and ResourceID to the scope', function () {
    expect(scope.mode).toBeDefined();
    expect(scope.ResourceID).toBeDefined();
  });
});
