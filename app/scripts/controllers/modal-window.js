angular.module('voyagerUiApp').controller('ModalWindowCtrl',
	function($scope, $timeout){
		'use strict';

		$scope.messages = [];
		$scope.activeBtns = [];
		$scope.activeMessage = '';
		$scope.activePromises = 0;
		$scope.minLoadingTime = 1750; //Milliseconds
		
		$scope.$watchCollection('[activePromises, messages.length]', function() {
			if($scope.activePromises === 0 && $scope.messages.length === 0) {
				$scope.closeWindow();
			} else {
				if($scope.closed === true) {
					$scope.openWindow();
				}
			}
		}, true);
		
		$scope.addMessage = function(message, buttons) {
			$timeout(function() {
				$scope.messages.push({
					message:message,
					buttons:buttons
				});
				$scope.showNextMessage();
			});
		};
		
		$scope.removeMessage = function() {
			$scope.messages.splice(0, 1);
			if($scope.messages.length > 0) {
				$scope.showNextMessage();
			}
		};
		
		$scope.addPromise = function(promise) {
			if($scope.activePromises === 0) {
				$scope.closeTime = new Date().getTime() + $scope.minLoadingTime;
			}
			$scope.activePromises += 1;
			
			promise.finally($scope.removePromise);
		};
		
		$scope.removePromise = function() {
			if($scope.activePromises === 1) {
				setTimeout(function() {
					$scope.activePromises -= 1;
					$scope.$apply();
				}, $scope.closeTime - (new Date().getTime()));
			} else {
				$scope.activePromises -= 1;
			}
		};
		
		$scope.respond = function(callback) {
			(callback || angular.noop)();
			$scope.removeMessage();
		};
		
		$scope.showNextMessage = function() {
			var possibleBtns = {
				cancel: {
					displayClass: 'btn-cancel',
					DisplayText: $scope.resourcesObj.Services.ModalWindow.CancelButton.DisplayText
				},
				close: {
					displayClass: 'btn-default',
					DisplayText: $scope.resourcesObj.Services.ModalWindow.CloseButton.DisplayText
				},
				no: {
					displayClass: 'btn-danger',
					DisplayText: $scope.resourcesObj.Services.ModalWindow.NoButton.DisplayText
				},
				ok: {
					displayClass: 'btn-default',
					DisplayText: $scope.resourcesObj.Services.ModalWindow.OkButton.DisplayText
				},
				save: {
					displayClass: 'btn-success',
					DisplayText: $scope.resourcesObj.Services.ModalWindow.SaveButton.DisplayText
				},
				yes: {
					displayClass: 'btn-success',
					DisplayText: $scope.resourcesObj.Services.ModalWindow.YesButton.DisplayText
				}
			};
			
			$scope.activeMessage = $scope.messages[0].message;
			$scope.activeBtns = (function(){
				var btn, activeBtnsWip = [];
				for(btn in $scope.messages[0].buttons) {
					if($scope.messages[0].buttons.hasOwnProperty(btn) && possibleBtns.hasOwnProperty(btn)) {
						activeBtnsWip.push({
							displayClass:possibleBtns[btn].displayClass,
							DisplayText:possibleBtns[btn].DisplayText,
							onClickCallback:$scope.messages[0].buttons[btn]
						});
					}
				}
				return activeBtnsWip;
			}());
		};
	});