'use strict';

describe('Controller: MasterFilesBomsCtrl', function () {

  // load the controller's module
  beforeEach(module('voyagerUiApp'));
	beforeEach(module('mockResolves'));
	beforeEach(module('mockResources'));

  var MasterFilesBomsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MasterFilesBomsCtrl = $controller('MasterFilesBomsCtrl', {
      $scope: scope
    });
  }));
	
	it('should attach data grid controls to scope', function () {
    expect(scope.onSelect).toBeDefined();
  });
});
