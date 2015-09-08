angular.module('voyagerUiApp').controller('EmailConfirmationCtrl',
	function(CompanyRegistration, $location, $q, $scope, $state) {
		'use strict';
		
		$scope.miHttpAlertTrigger = angular.noop;
		$scope.activationCode = $location.search().actcode;
		
		$scope.submit = function() {
			var deferment = $q.defer();
			
			CompanyRegistration.activate($scope.activationCode).then(function() {
				$state.go('base.login-template.register.complete');
				deferment.resolve();
			}).catch(function(response) {
				$scope.miHttpAlertTrigger(response.status, response.data);
				deferment.reject();
			});
			
			return deferment.promise;
		};
	});