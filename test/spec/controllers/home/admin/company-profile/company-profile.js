'use strict';

describe('Controller: AdminCompanyProfileCtrl', function () {

  // load the controller's module
  beforeEach(module('voyagerUiApp'));

  var AdminCompanyProfileCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdminCompanyProfileCtrl = $controller('AdminCompanyProfileCtrl', {
      $scope: scope
    });
  }));
});
