'use strict';

describe('Directive: equal', function () {

  // load the directive's module
  beforeEach(module('voyagerUiApp'));
	beforeEach(module('uiRouterNoop'));

  var formElement;

  beforeEach(inject(function () {
    formElement = angular.element(
      '<form name="testForm" novalidate>'+
        '<input type="text" ng-model="str1" equal="str2" name="elementOne" />'+
        '<input type="text" ng-model="str2" name="elementTwo" />'+
      '</form>'
    );
  }));

  it('shows equality to an equivalent value of another element', inject(function ($compile, $rootScope) {
    //Set values for each element
    $rootScope.str1 = 'A test string';
    $rootScope.str2 = 'A test string';
    
    formElement = $compile(formElement)($rootScope);
    $rootScope.$digest();
    
    expect($rootScope.testForm.elementOne.$valid).toEqual(true);
    expect($rootScope.testForm.$valid).toEqual(true);
  }));
  
  it('is invalid when an inequivalent value is compared', inject(function ($compile, $rootScope) {
    //Set values for each element
    $rootScope.str1 = 'A test string';
    $rootScope.str2 = 'A1 very2 different3 test4 string5';
    
    formElement = $compile(formElement)($rootScope);
    $rootScope.$digest();
    
    expect($rootScope.testForm.elementOne.$valid).not.toEqual(true);
    expect($rootScope.testForm.$valid).not.toEqual(true);
  }));
});
