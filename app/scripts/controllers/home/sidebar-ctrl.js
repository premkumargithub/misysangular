angular.module('voyagerUiApp').controller('SidebarCtrl',
	function(jQuery, $scope, $timeout, $rootScope) {
		'use strict';

		var sidebar = jQuery('.home .sidebar-wrap');
		var sidebarTransitionDuration = sidebar.css('transition-duration');
		var homePrimarySection = jQuery('html > body > div.container > div.home > section.primary');
		var primaryTransitionDuration = homePrimarySection.css('transition-duration');

		$scope.sidebarPinned = false;
		$scope.togglePin = function() {
			$scope.sidebarPinned = !$scope.sidebarPinned;
		};

		//Emitted from mi-list-panel as a reaction to a submenu item being selected
		$scope.isSideMenuActive = $rootScope.isSideMenuActive || false;

		if ($scope.isSideMenuActive) {
			$scope.sidebarHidden = false;
		} else {
			$scope.sidebarHidden = true;
		}
		if ($scope.sidebarHidden) {
			sidebar.css('transition-duration', '0ms');
			sidebar.addClass('hidden-by-slide');

			//Wait for transition to finish before adding the duration back
			//If the duration is added back immediately, the animation occurs
			$timeout(function() {
				sidebar.css('transition-duration', sidebarTransitionDuration);
			}, sidebarTransitionDuration);
		} else {
			homePrimarySection.css('transition-duration', '0ms');
			homePrimarySection.addClass('contracted');

			//Wait for transition to finish before adding the duration back
			//If the duration is added back immediately, the animation occurs
			$timeout(function() {
				homePrimarySection.css('transition-duration', primaryTransitionDuration);
			}, primaryTransitionDuration);
		}

		$scope.$on('ToggleSidebar', function() {
			if (!$scope.sidebarPinned) {
				$scope.sidebarHidden = !$scope.sidebarHidden;

				if ($scope.sidebarHidden) {
					sidebar.addClass('hidden-by-slide');
					homePrimarySection.removeClass('contracted');
				} else {
					sidebar.removeClass('hidden-by-slide');
					homePrimarySection.addClass('contracted');
				}
			}
		});
	});
