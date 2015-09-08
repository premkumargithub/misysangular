'use strict';

describe('Controller: MasterFilesJobsCtrl', function () {

  // load the controller's module
  beforeEach(module('voyagerUiApp'));

  var MasterFilesJobsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MasterFilesJobsCtrl = $controller('MasterFilesJobsCtrl', {
      $scope: scope
    });
  }));
});
