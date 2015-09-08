'use strict';

describe('Controller: LoginCtrl', function () {

  // load the controller's module
  beforeEach(module('voyagerUiApp'));
	beforeEach(module('stateMock'));
	beforeEach(module('mockResources'));

  var LoginCtrl, Login, scope, modalWindow;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $q, $rootScope, _Login_, _modalWindow_) {
    scope = $rootScope.$new();
		Login = _Login_;
    modalWindow = _modalWindow_;
		
		Login.getMessages = function() {
			return $q.defer().promise;
		};
    LoginCtrl = $controller('LoginCtrl', {
      $scope: scope
    });
  }));
	
  it('set the companyName to the value of the companyName cookie', function(){
    expect(scope.user.CompanyName).toEqual(localStorage.getItem('companyName'));
  });
  
  it('has empty username and password vals', function () {
    expect(scope.user.Username).toBe('');
    expect(scope.user.Password).toBe('');
  });

  it('calls the login method of Session on submit', inject(function(Session){
		Session.start = angular.noop;
		
		scope.user.CompanyName = 'TestCompanyName';
		scope.user.UserName = 'TestUserName';
		scope.login = {				//Set up the "form object"
			$invalid: false
		};
  
    spyOn(Session, 'start').andCallThrough();
		
    scope.submit();
		
    expect(Session.start).toHaveBeenCalled();
  }));
});
