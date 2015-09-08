angular.module('voyagerUiApp').controller('UserMiscToolsCtrl',
	function(Messaging, MessagingWindow, $scope, Session, $state) {
		'use strict';
		
		//Messaging
		$scope.loading = false;
		$scope.messageCount = 2;
		$scope.messagingUpdates = [];
		
		$scope.hasMessages = function() {
			return $scope.messageCount > 0;
		};
		
		$scope.activate = function(event) {
			var element = angular.element(event.target);
			
			while('LI' !== element.prop('tagName')) {
				element = element.parent();
			}
			
			if(element.hasClass('active')) {
				element.removeClass('active');
			} else {
				element.parent().children().removeClass('active');
				element.addClass('active');
				
				if(element.hasClass('messages')) {
					$scope.reloadUpdates();
				}
			}
		};
		
		$scope.messagingWindowOpen = function() {
			return MessagingWindow.isOpen();
		};
		$scope.viewAll = function() {
			MessagingWindow.open();
		};
		
		$scope.reloadUpdates = function() {
			var messagingUpdatesRequest = Messaging.getUpdates();
			$scope.loading = true;
			
			messagingUpdatesRequest.then(function(response) {
				$scope.loading = false;
				$scope.messageCount = 0;
				$scope.messagingUpdates = response.data;
			});
			
			$scope.reloadPromise = messagingUpdatesRequest;
			return messagingUpdatesRequest;
		};
		
		//User
		$scope.getUserDisplayName = function() {
			var userDisplayName;
			
			if($scope.userName !== '') {
				userDisplayName = $scope.userName;
			} else {
				userDisplayName = Session.getSessionData().userID;
			}
			
			return userDisplayName;
		};

		$scope.companyID = Session.getSessionData().companyID;
		$scope.goToSessionUser = function() {
			$state.go('base.home.admin.users.selection', {mode:'edit', ResourceID:Session.getSessionData().userResourceID});
		};
		
		$scope.logout = function() {
			Session.stop().then(function() {
				$state.go('base.login-template.default');
			});
		};
	});