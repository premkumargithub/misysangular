angular.module('voyagerUiApp').config(['$stateProvider', function ($stateProvider) {
	'use strict';
	
	$stateProvider
		.state('base.home.planning', {
			url: '/planning',
			views: {
				'home-content': {
					templateUrl: 'views/home/planning/index.html'
				}
			},
			getBreadCrumbName: function(resourcesObj) {
				return resourcesObj.Views.Home.Planning.DisplayText;
			}
		});
}]);