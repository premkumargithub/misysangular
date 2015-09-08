'use strict';

describe('Controller: MasterFilesItemsCtrl', function () {

  // load the controller's module
  beforeEach(module('voyagerUiApp'));
	beforeEach(module('mockResolves'));
	beforeEach(module('mockResources'));

  var MasterFilesItemsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MasterFilesItemsCtrl = $controller('MasterFilesItemsCtrl', {
      $scope: scope
    });
  }));
});
