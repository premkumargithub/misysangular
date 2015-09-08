'use strict';

describe('Controller: AdminDepartmentSelectionCtrl', function() {

  // load the controller's module
  beforeEach(module('voyagerUiApp'));
  beforeEach(module('mockResolves'));
  beforeEach(module('mockResources'));

  var AdminDepartmentSelectionCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    AdminDepartmentSelectionCtrl = $controller('AdminDepartmentSelectionCtrl', {
      $scope: scope
    });
  }));

  it('should attach a mode and ResourceID to the scope', function() {
    expect(scope.mode).toBeDefined();
    expect(scope.ResourceID).toBeDefined();
    expect(scope.parentState).toBeDefined();
  });

  it('should attach data grid controls to scope', function() {
    expect(scope.onDelete).toBeDefined();
  });

  it('should attach data grid controls to scope', function() {
    expect(scope.onSave).toBeDefined();
  });
  
});
