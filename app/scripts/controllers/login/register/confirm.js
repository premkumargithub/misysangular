angular.module('voyagerUiApp').controller('RegisterConfirmCtrl',
	function(CompanyRegistration, $q, $scope, $state) {
		'use strict';
		console.log($scope.company);
		$scope.isEmpty = function(value) {
			var empty = true;
			
			if(angular.isDefined(value)) {
				if(value !== null && value !== '') {
					empty = false;
				}
			}
			
			return empty;
		};
		
		var stepOneComplete =
			!$scope.isEmpty($scope.company.CompanyName) &&
			!$scope.isEmpty($scope.company.ZipCode) &&
			!$scope.isEmpty($scope.company.Country) &&
			!$scope.isEmpty($scope.company.ContactName) &&
			!$scope.isEmpty($scope.company.JobTitle) &&
			!$scope.isEmpty($scope.company.EmailAddress);
			
		var stepTwoComplete =
			!$scope.isEmpty($scope.company.Address1) &&
			!$scope.isEmpty($scope.company.Phone);

		if (!stepOneComplete) {
			$state.go('base.login-template.register.step-one');
		}
		
		if (!stepTwoComplete) {
			$state.go('base.login-template.register.step-two');
		}
		
		$scope.miHttpAlertTrigger = angular.noop;
		
		$scope.register = function () {
			var deferment = $q.defer();
			
			CompanyRegistration.register($scope.company).then(function () {
				$state.go('base.login-template.register.email-sent');
			}).catch (function (response) {
				deferment.reject();
				$scope.miHttpAlertTrigger(response.status, response.data);
			});
			
			return deferment.promise;
		};
		
	});