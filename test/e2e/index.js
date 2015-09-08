describe('Index page', function() {
	beforeEach(function() {
		browser.params.loadApp();
	});
	
	it('redirects to login', function() {
		expect(browser.getCurrentUrl()).toContain('#/login');
	});
});