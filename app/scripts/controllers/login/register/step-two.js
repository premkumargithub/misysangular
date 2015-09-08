angular.module('voyagerUiApp').controller('RegisterStepTwoCtrl',
	function ($q, $scope, $state) {
		'use strict';

		var stepOneComplete =
			$scope.company.CompanyName.length > 0 &&
			$scope.company.ZipCode.length > 0 &&
			$scope.company.Country.length > 0 &&
			$scope.company.ContactName.length > 0 &&
			$scope.company.JobTitle.length > 0 &&
			$scope.company.EmailAddress.length > 0;

		if (!stepOneComplete) {
			$state.go('base.login-template.register.step-one');
		}

		$scope.cancelAlert = angular.noop;
		$scope.miHttpAlertTrigger = angular.noop;
		
		$scope.$watchGroup(['stepTwo.$invalid', 'stepTwo.$submitted'], function() {
			if($scope.stepTwo.$submitted) {
				if($scope.stepTwo.$invalid) {
					$scope.miHttpAlertTrigger(300, {Message: 'Please correct the indicated fields above.'});
				} else {
					$scope.cancelAlert();
				}
			}
		});

		$scope.submit = function () {
			var deferment = $q.defer();
			
			if($scope.stepTwo.$invalid) {
				$scope.miHttpAlertTrigger(300, {Message: 'Please correct the indicated fields above.'});
				deferment.resolve();
			} else {
				$state.go('base.login-template.register.confirm');
			}
			
			return deferment.promise;
		};
	});
