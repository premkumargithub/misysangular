angular.module('voyagerUiApp').config(['$stateProvider', function ($stateProvider) {
	'use strict';
	
	$stateProvider
		.state('base.home.production', {
			url: '/production',
			views: {
				'home-content': {
					templateUrl: 'views/home/production/index.html'
				}
			},
			getBreadCrumbName: function(resourcesObj) {
				return resourcesObj.Views.Home.Production.DisplayText;
			}
		});
}]);