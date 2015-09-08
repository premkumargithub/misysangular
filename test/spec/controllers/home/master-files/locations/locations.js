'use strict';

describe('Controller: MasterFilesLocationsCtrl', function () {

  // load the controller's module
  beforeEach(module('voyagerUiApp'));
  beforeEach(module('mockResources'));
  beforeEach(module('mockResolves'));

  var MasterFilesLocationsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MasterFilesLocationsCtrl = $controller('MasterFilesLocationsCtrl', {
      $scope: scope
    });
  }));

});
