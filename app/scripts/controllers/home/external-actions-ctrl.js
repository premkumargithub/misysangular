angular.module('voyagerUiApp').controller('ExternalActionsCtrl',
	function($scope) {
		'use strict';
		
		//Delegates for help-menu directive
		$scope.toggleHelp = angular.noop;
		$scope.toggleHelpVideos = angular.noop;
		
		$scope.helpActive = false;
		$scope.clickHelpIcon = function() {
			$scope.toggleHelp();
		};
		
		$scope.helpVideosActive = false;
		$scope.clickHelpVideosIcon = function() {
			$scope.toggleHelpVideos();
		};
		
		$scope.$on('HelpShown', function() {
			$scope.helpActive = true;
		});
		$scope.$on('HelpHidden', function() {
			$scope.helpActive = false;
		});
		$scope.$on('HelpVideosShown', function() {
			$scope.helpVideosActive = true;
		});
		$scope.$on('HelpVideosHidden', function() {
			$scope.helpVideosActive = false;
		});
	});