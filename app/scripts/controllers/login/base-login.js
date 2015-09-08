angular.module('voyagerUiApp').controller('BaseLoginCtrl',
	function ($scope) {
		'use strict';
		
		//Delegates for help-menu directive
		$scope.toggleHelp = angular.noop;
		$scope.toggleHelpVideos = angular.noop;
		
		$scope.clickHelpIcon = function() {
			$scope.toggleHelp();
		};
  });
