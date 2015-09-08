angular.module('voyagerUiApp').controller('MiPanelCtrl',
	function(modalWindow, $q, resources, $scope, $state) {
		'use strict';
		
		//Show loading screen until promises are satisfied
		$scope.isLoading = false;
		$scope.activePromises = 0;
		$scope.waitFor = function(promise) {
			if($scope.isLoading === false) {
				$scope.isLoading = true;
			}
			$scope.activePromises += 1;
			promise.finally($scope.finishWait);
		};
		
		$scope.finishWait = function() {
			$scope.activePromises -= 1;
			if($scope.activePromises === 0) {
				$scope.isLoading = false;
			}
		};
		
		//Delegates for two miHttpAlerts, called by parent controller and duplicated here
		$scope.miHttpAlertTriggerUpper = angular.noop;
		$scope.miHttpAlertTriggerLower = angular.noop;
		
		$scope.miHttpAlertTrigger = function(status, data) {
			$scope.miHttpAlertTriggerUpper(status, data);
			$scope.miHttpAlertTriggerLower(status, data);
		};
		
		//Set save/cancel/delete button click events
		$scope.setClickEvents = function(mode) {
			if(mode === 'add') {
				$scope.save = function() {
					var request = $scope.saveResource().then(function(response) {
						$scope.noSaveOnExit = true;
						$state.go($state.current.name, {ResourceID: response.data.ResourceID, mode:'edit'});
					}).catch(function(response) {
						$scope.miHttpAlertTrigger(response.status, response.data);
					});
					
					return request;
				};
				$scope.cancel = function() {
					$scope.noSaveOnExit = true;
					$state.go('^');
				};
				$scope.delete = function() {
					$scope.noSaveOnExit = true;
					$state.go('^');
				};
			} else {
				$scope.save = function() {
					var request = $scope.updateResource().then(function() {
						$scope.panelForm.$setPristine();
						$scope.miHttpAlertTrigger(200, {Message: 'Saved Changes.'});
					}).catch(function(response) {
						$scope.miHttpAlertTrigger(response.status, response.data);
					});
					
					return request;
				};
				$scope.cancel = angular.noop;
				$scope.delete = function(){
					var request = $scope.deleteResource().then(function() {
						$scope.noSaveOnExit = true;
						$state.go('^');
					}).catch(function(response) {
						$scope.miHttpAlertTrigger(response.status, response.data);
					});
					
					return request;
				};
			}
		};
		
		//Check documentation for notify:false in $state.go
		$scope.noSaveOnExit = false;
		$scope.askToSave = function() {
			return !$scope.panelForm.$pristine && !$scope.noSaveOnExit;
		};
		
		$scope.$on('$stateChangeStart', function(event, toState, toParams) {
			//If the new state is not a child of this state
			if(toState.name.indexOf($state.current.name) < 0 || toState.name === $state.current.name) {
				if($scope.askToSave()) {
					event.preventDefault();
					
					modalWindow.showMessage(modalWindow.getUpdateMessageFor($scope.getIdentifier()), {
						'yes': function() {
							if($scope.miPanelMode === 'add') {
								$scope.saveResource().then(function() {
									$scope.noSaveOnExit = true;
									$state.go(toState, toParams, {});
								}).catch(function(response) {
									$scope.miHttpAlertTrigger(response.status, response.data);
								});
							} else {
								$scope.updateResource().then(function() {
									$scope.noSaveOnExit = true;
									$state.go(toState, toParams, {});
								}).catch(function(response) {
									$scope.miHttpAlertTrigger(response.status, response.data);
								});
							}
						},
						'no': function() {
							$scope.noSaveOnExit = true;
							$state.go(toState, toParams);
						},
						'cancel': angular.noop
					});
				}
			}
		});
	});