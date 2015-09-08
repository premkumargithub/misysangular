'use strict';

describe('Controller: MiPanelCtrl', function () {

  // load the controller's module
  beforeEach(module('voyagerUiApp'));
  beforeEach(module('mockResources'));

  var MiPanelCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MiPanelCtrl = $controller('MiPanelCtrl', {
      $scope: scope
    });
  }));
});
