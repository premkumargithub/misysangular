/* global jQuery */

'use strict';

describe('Directive: miTooltip', function () {

  // load the directive's module
  beforeEach(module('voyagerUiApp'));
  beforeEach(module('uiRouterNoop'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
		scope.message = 'Make sure you do x, y, and z!';
  }));
	
	it('has jQuery\'s tooltip initializer available', inject(function () {
    expect(jQuery(element).tooltip).toBeDefined();
  }));
});
