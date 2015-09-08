'use strict';

describe('Directive: miHelpMenu', function () {

  beforeEach(module('voyagerUiApp'));
  beforeEach(module('mockResources'));
  beforeEach(module('mockHelpResources'));

  var scope, element;

  beforeEach(inject(function ($compile, $rootScope, resources) {
		$rootScope.resourcesObj = resources.get();
    scope = $rootScope.$new();
		
		//Delegates
		scope.toggleHelp = angular.noop;
		scope.toggleHelpVideos = angular.noop;
		
		element = $compile(
			'<mi-help-menu '+
				'mi-help-menu-toggle="toggleHelp" '+
				'mi-help-menu-toggle-videos="toggleHelpVideos" '+
			'>'+
			'</mi-help-menu>'
		)(scope);
		scope.$digest();
	}));
	
	it('is hidden by default', function() {
		expect(element.hasClass('help-hidden')).toBe(true);
	});
	
	it('is shown when toggleHelp is called', function() {
		scope.toggleHelp();
		expect(element.isolateScope().hidden).toBe(false);
	});
	
	it('is hidden when toggleHelp is called twice', function() {
		scope.toggleHelp();
		scope.toggleHelp();
		expect(element.isolateScope().hidden).toBe(true);
	});
	
	it('shows videos when toggleHelpVideos is called', function() {
		scope.toggleHelpVideos();
		expect(element.isolateScope().videosHidden).toBe(false);
	});
	
	it('hides videos when toggleHelpVideos is called twice', function() {
		scope.toggleHelpVideos();
		scope.toggleHelpVideos();
		expect(element.isolateScope().videosHidden).toBe(true);
	});
	
	it('stays open when only one type of help is open', function() {
		scope.toggleHelp();
		scope.$digest();
		expect(element.hasClass('help-hidden')).toBe(false);
		
		scope.toggleHelp();
		scope.$digest();
		expect(element.hasClass('help-hidden')).toBe(true);
		
		scope.toggleHelpVideos();
		scope.$digest();
		expect(element.hasClass('help-hidden')).toBe(false);
		
		scope.toggleHelpVideos();
		scope.$digest();
		expect(element.hasClass('help-hidden')).toBe(true);
		
	});
});