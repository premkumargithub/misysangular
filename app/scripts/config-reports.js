angular.module('voyagerUiApp').config(['$stateProvider', function ($stateProvider) {
	'use strict';
	
	$stateProvider
		.state('base.home.reports', {
			url: '/reports',
			views: {
				'home-content': {
					templateUrl: 'views/home/reports/index.html'
				}
			},
			getBreadCrumbName: function(resourcesObj) {
				return resourcesObj.Views.Home.Reports.DisplayText;
			}
		});
}]);