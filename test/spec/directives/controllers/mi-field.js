'use strict';

describe('Controller: MiFieldCtrl', function () {

  // load the controller's module
  beforeEach(module('voyagerUiApp'));
  beforeEach(module('mockResources'));

  var MiFieldCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MiFieldCtrl = $controller('MiFieldCtrl', {
      $scope: scope
    });
  }));
	
	it('returns the resources given a property', inject(function(resources) {
		spyOn(resources, 'getPropertyByString').andCallThrough();
		scope.getResourcesProperties('Resources.User.Properties.AccountStatus');
		expect(resources.getPropertyByString).toHaveBeenCalledWith('Resources.User.Properties.AccountStatus');
	}));
	
	it('returns display text given a property', inject(function(resources) {
		var displayText;
		
		spyOn(scope, 'getResourcesProperties').andCallThrough();
		spyOn(resources, 'getPropertyByString').andCallThrough();
		displayText = scope.getDisplayText('Resources.User.Properties.AccountStatus');
		
		expect(scope.getResourcesProperties).toHaveBeenCalledWith('Resources.User.Properties.AccountStatus');
		expect(displayText).toBe(resources.get().Resources.User.Properties.AccountStatus.DisplayText);
	}));
	
	it('returns an id given a property', function() {
		expect(scope.getName('Resources.User.Properties.AccountStatus')).toBe('resourcesuserpropertiesaccountstatus');
	});
	
	it('returns an property name given a property', function() {
		expect(scope.getPropertyName('Resources.User.Properties.AccountStatus')).toBe('AccountStatus');
	});
});
