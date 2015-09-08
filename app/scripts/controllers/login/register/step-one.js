/* jshint camelcase: false */

angular.module('voyagerUiApp').controller('RegisterStepOneCtrl',
	function(Geocoder, $q, $scope, $state, $timeout) {
		'use strict';
		
		var retrieveLocation = function() {
			var deferment = $q.defer();
		
			Geocoder.getAddressByZipOrPostal($scope.company.ZipCode, function(results) {
				if(results.length > 0) {
					angular.forEach(results[0].address_components, function(component) {
						if(component.types.indexOf('neighborhood') > -1 || component.types.indexOf('locality') > -1) {
							$scope.company.City = component.long_name;
						}
						if(component.types.indexOf('administrative_area_level_1') > -1) {
							$scope.company.State = component.long_name;
						}
					});
					$scope.$apply();
				}
				
				deferment.resolve();
				$state.go('base.login-template.register.step-two');
			}, function() {
				deferment.resolve();
				$state.go('base.login-template.register.step-two');
			});
				
			return deferment.promise;
		};
		
		$scope.cancelAlert = angular.noop;
		$scope.miHttpAlertTrigger = angular.noop;
		
		$scope.$watchGroup(['stepOne.$invalid', 'stepOne.$submitted'], function() {
			if($scope.stepOne.$submitted) {
				if($scope.stepOne.$invalid) {
					$scope.miHttpAlertTrigger(300, {Message: 'Please correct the indicated fields above.'});
				} else {
					$scope.cancelAlert();
				}
			}
		});
		
		$scope.submit = function() {
			var deferment = $q.defer();
			
			if($scope.stepOne.$invalid) {
				$scope.miHttpAlertTrigger(300, {Message: 'Please correct the indicated fields above.'});
				deferment.resolve();
			} else {
				$timeout(function() {
					retrieveLocation().then(function() {
						$state.go('base.login-template.register.step-two');
					}).catch(function() {
						$state.go('base.login-template.register.step-two');
					});
				}, 500);
			}
			
			return deferment.promise;
		};
	});