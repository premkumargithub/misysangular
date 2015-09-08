'use strict';

describe('Directive: capitalize', function () {

  // load the directive's module
  beforeEach(module('voyagerUiApp'));

  var //element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));
	
	it('checks if one is one', function() {
		expect(1).toBe(1);
	});
});
