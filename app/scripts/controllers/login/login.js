angular.module('voyagerUiApp').controller('LoginCtrl',
	function($scope, $state, $q, Login, Session) {
		'use strict';
		
		//miHtttpAlertRevisit delegate
		$scope.miHttpAlertTrigger = angular.noop;
		
		//External action delegates
		$scope.toggleHelp = angular.noop;
		$scope.clickHelpIcon = function() {
			$scope.toggleHelp();
		};
		
		//Inputs in view
		$scope.user = {
			CompanyName: localStorage.getItem('companyName'),
			Username: '',
			Password: '',
			SecurityQuestion: '',
			SecurityAnswer: ''
		};
		$scope.rememberCompanyName = true;

		$scope.goToPasswordRecovery = function(){
			
			$scope.$parent.PasswordRecoveryPrefield = {};
			$scope.$parent.PasswordRecoveryPrefield.CompanyName = $scope.user.CompanyName;
			$scope.$parent.PasswordRecoveryPrefield.UserName = $scope.user.UserName;
			$state.go('base.login-template.password-recovery.password-recovery');
			
		};
		
		$scope.cancelAlert = angular.noop;
		$scope.miHttpAlertTrigger = angular.noop;
		
		$scope.$watchGroup(['login.$invalid', 'login.$submitted'], function() {
			if(angular.isDefined($scope.login)) {
				if($scope.login.$submitted) {
					if($scope.login.$invalid) {
						$scope.miHttpAlertTrigger(300, {Message: 'Please correct the indicated fields above.'});
					} else {
						$scope.cancelAlert();
					}
				}
			}
		});
		
		//Called on ng-submit
		$scope.submit = function(){
			var deferment, successCallback, errorCallback;
			deferment = $q.defer();
			
			successCallback = function() {
				if($scope.rememberCompanyName){
					localStorage.setItem('companyName', $scope.user.CompanyName);
				}else{
					localStorage.removeItem('companyName');
				}
				
				$state.go('base.home.dashboard');
			};
			
			errorCallback = function (result) {
				if(angular.isDefined(result.data.SecurityQuestion)) {
					if(result.data.SecurityQuestion !== null) {
						$scope.user.SecurityQuestion = result.data.SecurityQuestion;
					}
				}
				
				$scope.miHttpAlertTrigger(result.status, result.data);
				deferment.reject();
			};
			
			if($scope.login.$invalid) {
				$scope.miHttpAlertTrigger(300, {Message: 'Please correct the indicated fields above.'});
				deferment.resolve();
			} else {
				Session.start($scope.user, successCallback, errorCallback);
			}
			
			return deferment.promise;
		};
	});
