'use strict';

describe('Directive: passwordStrengthMeter', function () {

  beforeEach(module('voyagerUiApp'));
	beforeEach(module('uiRouterNoop'));
	beforeEach(module('mockResources'));

  var element,
    scope;

  beforeEach(inject(function ($compile, $rootScope) {
    scope = $rootScope.$new();
		
		scope.minRequirements = /^(?=[0-9a-zA-Z]*[!@#$%&\*+?])(?=[a-zA-Z!@#$%&\*+?]*\d)(?=[0-9A-Z!@#$%&\*+?]*[a-z])(?=[0-9a-z!@#$%&\*+?]*[A-Z])[0-9a-zA-Z!@#$%&\*+?]{8,}$/;
		element = angular.element('<div password-strength-meter password="password" min-requirements="minRequirements"></div>');
    element = $compile(element)(scope);
	}));
	
	it('is not set when a password is below minRequirements', function() {
		scope.password = '';
		scope.$apply();
		
		var liLights = element.find('li');
		expect(angular.element(liLights[0]).hasClass('invalid')).toBe(true);
		expect(angular.element(liLights[1]).hasClass('invalid')).toBe(true);
		expect(angular.element(liLights[2]).hasClass('invalid')).toBe(true);
		expect(angular.element(liLights[3]).hasClass('invalid')).toBe(true);
	});

  it('indicates a Fair password when it meets the minRequirements', function() {
		scope.password = 'oneM0re!';
		scope.$apply();
		
		var liLights = element.find('li');
		expect(element.isolateScope().strengthLabel).toBe('Fair');
		expect(angular.element(liLights[0]).hasClass('invalid')).toBe(false);
		expect(angular.element(liLights[1]).hasClass('invalid')).toBe(false);
		expect(angular.element(liLights[2]).hasClass('invalid')).toBe(true);
		expect(angular.element(liLights[3]).hasClass('invalid')).toBe(true);
  });
	
	it('respects all advertised special characters', function() {
    var basePassword = 'oneM0re', specialCharacters = ['!', '@', '#', '$', '%', '&', '+', '?', '*'];
		
		angular.forEach(specialCharacters, function(specialChar) {
			scope.password = basePassword+specialChar;
			scope.$apply();
			expect(element.isolateScope().strengthLabel).toBe('Fair');
		});
  });
	
	it('indicates a Good password when it meets the Good Requirements', function() {
		scope.password = 'oneM0re!!';
		scope.$apply();
		
		var liLights = element.find('li');
		expect(element.isolateScope().strengthLabel).toBe('Good');
		expect(angular.element(liLights[0]).hasClass('invalid')).toBe(false);
		expect(angular.element(liLights[1]).hasClass('invalid')).toBe(false);
		expect(angular.element(liLights[2]).hasClass('invalid')).toBe(false);
		expect(angular.element(liLights[3]).hasClass('invalid')).toBe(true);
  });
	
	it('indicates a Strong password when it meets the Strong Requirements', function() {
		scope.password = 'oneM0re!!0';
		scope.$apply();
		
		var liLights = element.find('li');
		expect(element.isolateScope().strengthLabel).toBe('Strong');
		expect(angular.element(liLights[0]).hasClass('invalid')).toBe(false);
		expect(angular.element(liLights[1]).hasClass('invalid')).toBe(false);
		expect(angular.element(liLights[2]).hasClass('invalid')).toBe(false);
		expect(angular.element(liLights[3]).hasClass('invalid')).toBe(false);
  });
});
