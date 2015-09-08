'use strict';

describe('Directive: slideLeft', function () {

  // load the directive's module
  beforeEach(module('voyagerUiApp'));
  beforeEach(module('uiRouterNoop'));

  var //element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));
	/*
  it('slides an element left', inject(function ($compile) {
		scope.mockBool = true;
	
    element = angular.element('<div style="width:100px;" slide-left="mockBool"></div>');
    element = $compile(element)(scope);
		scope.$apply();
		
		waitsFor(function(){
			return parseFloat(element.css('margin-left')) < 0;
		}, 'element is done sliding left', 1000);
		
		runs(function(){
			expect(parseFloat(element.css('margin-left'))).toBeLessThan(0);
		});
  }));
	
	it('slides an element left', inject(function ($compile) {
		scope.mockBool = false;
	
    element = angular.element('<div style="margin-left:-100px; width:100px;" slide-left="mockBool"></div>');
    element = $compile(element)(scope);
		scope.$apply();
		
		waitsFor(function(){
			return parseFloat(element.css('margin-left')) > -100;
		}, 'element is done sliding right', 1000);
		
		runs(function(){
			expect(parseFloat(element.css('margin-left'))).toBeGreaterThan(-100);
		});
  }));
	*/
});
