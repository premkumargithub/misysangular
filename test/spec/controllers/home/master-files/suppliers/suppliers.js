'use strict';

describe('Controller: MasterFilesSuppliersCtrl', function () {

  // load the controller's module
  beforeEach(module('voyagerUiApp'));
	beforeEach(module('mockResolves'));
	beforeEach(module('mockResources'));

  var MasterFilesSuppliersCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MasterFilesSuppliersCtrl = $controller('MasterFilesSuppliersCtrl', {
      $scope: scope
    });
  }));

  it('should attach data grid controls to scope', function() {
    expect(scope.onSelect).toBeDefined();
  });
});
