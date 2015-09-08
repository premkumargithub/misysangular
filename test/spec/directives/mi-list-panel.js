'use strict';

describe('Directive: panelDropDown', function () {

  // load the directive's module
  beforeEach(module('voyagerUiApp'));

  var scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));
  
  it('checks if one is one', function() {
		expect(1).toBe(1);
	});
});
