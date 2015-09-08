var screenshot = require(process.cwd()+'/test/e2e-libs/screenshot');

describe('Login page', function() {
	beforeEach(function() {
		browser.params.loadApp();
	});
	
	describe('login fields', function() {
		var companyNameField, usernameField, passwordField, securityAnswerField, loginButton;
		beforeEach(function() {
			companyNameField = element(by.name('resourcesloginpropertiescompanyname'));
			usernameField = element(by.name('resourcesloginpropertiesusername'));
			passwordField = element(by.name('resourcesuserpropertiespassword'));
			securityAnswerField = element(by.name('resourcesuserpropertiessecurityanswer'));
			loginButton = element(by.css('button.mi-button'));
		});
		
		it('changes User ID value to uppercase', function() {
			var lowercaseUserID = 'test';
			usernameField.sendKeys(lowercaseUserID);
			expect(usernameField.getAttribute('value')).toBe(lowercaseUserID.toUpperCase());
		});
		
		it('are required', function() {
			expect(companyNameField.getAttribute('required')).toBe('true');
			expect(usernameField.getAttribute('required')).toBe('true');
			expect(passwordField.getAttribute('required')).toBe('true');
		});
		
		it('hide Security Question and Answer', function(){
			expect(element(by.css('div.security-question')).isDisplayed()).toBe(false);
		});
		
		it('do not require Security Answer', function() {
			expect(securityAnswerField.getAttribute('required')).toBe(null);
		});
	});
	
	describe('login process', function() {
		var companyNameField, usernameField, passwordField, securityAnswerField, loginButton;
		beforeEach(function() {
			companyNameField = element(by.name('resourcesloginpropertiescompanyname'));
			usernameField = element(by.name('resourcesloginpropertiesusername'));
			passwordField = element(by.name('resourcesuserpropertiespassword'));
			securityAnswerField = element(by.name('resourcesuserpropertiessecurityanswer'));
			loginButton = element(by.css('button.mi-button'));
		});
		
		it('enables login button when required fields are filled out', function() {
			companyNameField.getAttribute('value').then(function(value) {
				if(value !== browser.params.companyid) {
					companyNameField.sendKeys(browser.params.companyid);
				}
			});
			usernameField.sendKeys(browser.params.users.admin.username);
			passwordField.sendKeys(browser.params.users.admin.password);
			expect(loginButton.getAttribute('disabled')).toBe(null);
		});
		
		/*
		//User INQ (I Need Question) always requires a security answer
		it('reveals the security answer when security answer is required', function() {
			companyNameField.getAttribute('value').then(function(value) {
				if(value !== 'john-dev') {
					companyNameField.sendKeys('john-dev');
				}
			});
			usernameField.sendKeys('INQ');
			passwordField.sendKeys('oneM0re!');
			loginButton.click();
			
			expect(element(by.css('div.security-question')).isDisplayed()).toBe(true);
			expect(securityAnswerField.isDisplayed()).toBe(true);
			expect(browser.getCurrentUrl()).toContain('#/login');
		});
		
		//User INQ (I Need Question) always requires a security answer
		it('redirects after a successful login', function() {
			companyNameField.getAttribute('value').then(function(value) {
				if(value !== 'john-dev') {
					companyNameField.sendKeys('john-dev');
				}
			});
			usernameField.sendKeys('INQ');
			passwordField.sendKeys('oneM0re!');
			loginButton.click();
			
			securityAnswerField.sendKeys('yes');
			loginButton.click();
			expect(browser.getCurrentUrl()).toContain('#/home');
		});
		*/
	});
	
	afterEach(function() {
		screenshot.takeScreenshot(jasmine.getEnv().currentSpec, '/login/login/');
	});
});