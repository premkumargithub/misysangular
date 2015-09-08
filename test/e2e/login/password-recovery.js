var screenshot = require(process.cwd()+'/test/e2e-libs/screenshot');

describe('Password recovery page', function() {
	beforeEach(function() {
		browser.params.loadApp();
		browser.get('/#/login/password-recovery');
	});
	
	describe('form fields', function() {
		it('changes User ID value to uppercase', function() {
			var userIdField = element(by.name('resourcesloginpropertiesusername')),
				lowercaseUserID = 'test';
				
			userIdField.sendKeys(lowercaseUserID);
			expect(userIdField.getAttribute('value')).toBe(lowercaseUserID.toUpperCase());
		});
	
		it('are required', function() {
			expect(element(by.name('resourcesloginpropertiescompanyname')).getAttribute('required')).toBe('true');
			expect(element(by.name('resourcesloginpropertiesusername')).getAttribute('required')).toBe('true');
		});
	});
	
	afterEach(function() {
		screenshot.takeScreenshot(jasmine.getEnv().currentSpec, '/login/password-recovery/');
	});
});