'use strict';

describe('Service: PasswordRecoveryValues', function () {

  // load the service's module
  beforeEach(module('voyagerUiApp'));

  // instantiate service
  var PasswordRecoveryValues;
  beforeEach(inject(function (_PasswordRecoveryValues_) {
    PasswordRecoveryValues = _PasswordRecoveryValues_;
  }));

  it('should exist', function () {
    expect(!!PasswordRecoveryValues).toBeDefined();
  });
	
	it('has the values needed for password recovery', function() {
		expect(PasswordRecoveryValues.hasOwnProperty('authCode')).toBeDefined();
		expect(PasswordRecoveryValues.hasOwnProperty('companyName')).toBeDefined();
		expect(PasswordRecoveryValues.hasOwnProperty('userName')).toBeDefined();
		expect(PasswordRecoveryValues.hasOwnProperty('emailAddress')).toBeDefined();
		expect(PasswordRecoveryValues.hasOwnProperty('securityAnswer')).toBeDefined();
	});
});
