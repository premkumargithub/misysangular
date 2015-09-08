var authcode = 'abc-123', screenshot = require(process.cwd()+'/test/e2e-libs/screenshot');

describe('Password recovery page', function() {
	beforeEach(function() {
		browser.params.loadApp();
		browser.get('/#/login/password-recovery/reset-code?authcode='+authcode);
	});
	
	describe('form fields', function() {
		it('are required', function() {
			expect(element(by.name('resourcesrecoveryvaluespropertiesauthcode')).getAttribute('required')).toBe('true');
		});
		
		it('are filled when authcode is in the query string', function() {
			expect(element(by.name('resourcesrecoveryvaluespropertiesauthcode')).getAttribute('value')).toBe(authcode);
		});
	});
	
	afterEach(function() {
		screenshot.takeScreenshot(jasmine.getEnv().currentSpec, '/login/password-recovery/reset-code/');
	});
});