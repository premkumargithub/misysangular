'use strict';

describe('Controller: BaseLoginCtrl', function () {

  // load the controller's module
  beforeEach(module('voyagerUiApp'));
  beforeEach(module('mockResources'));

  var BaseLoginCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BaseLoginCtrl = $controller('BaseLoginCtrl', {
      $scope: scope
    });
  }));
});
