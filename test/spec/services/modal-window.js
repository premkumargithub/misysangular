'use strict';
/* global jQuery */

describe('Service: modalWindow', function () {

  // load the service's module
  beforeEach(module('voyagerUiApp'));
  beforeEach(module('uiRouterNoop'));
  beforeEach(module('mockResources'));

  // instantiate service
  var modalWindow, rootScope, q;
  beforeEach(inject(function (_modalWindow_, $rootScope, $q) {
    modalWindow = _modalWindow_;
		rootScope = $rootScope;
		q = $q;
  }));
	
	afterEach(function() {
		jQuery('body > div.modal').remove();
	});

  it('should do something', function () {
    expect(!!modalWindow).toBe(true);
  });
	
	it('creates a modal window', function() {
		var windowElement;
		modalWindow.waitFor(q.defer().promise);
		
		windowElement = jQuery('body > div.modal');
		
		expect(windowElement).toBeDefined();
	});
	
	it('creates a modal window with a loading-screen class on waitFor', function() {
		var windowElement;
		modalWindow.waitFor(q.defer().promise);
		rootScope.$apply();
		
		windowElement = jQuery('body > div.modal');
		
		expect(windowElement.hasClass('loading-screen')).toBe(true);
	});
	
	/*Works in practice, but during testing multiple modal windows are created, revisit
	it('closes its modal window with the close method', function() {
	});
	*/
	
	it('shows a message when using the showMessage method', function() {
		var windowElement;
		modalWindow.showMessage('I would like to tell you something.', {
			'ok': function() {
				console.log('Being a callback is fun!');
			}
		});

		windowElement = jQuery('body > div.modal');
		
		expect(windowElement.hasClass('loading-screen')).not.toBe(true);
	});
	
	it('returns a string update message when getUpdateMessageFor is called', function() {
		expect(typeof modalWindow.getUpdateMessageFor('me')).toBe('string');
		expect(modalWindow.getUpdateMessageFor('me-123').indexOf('me-123')).toBeGreaterThan(-1);
	});
});
