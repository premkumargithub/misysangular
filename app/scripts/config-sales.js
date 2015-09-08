angular.module('voyagerUiApp').config(['$stateProvider', function ($stateProvider) {
	'use strict';
	
	$stateProvider
		.state('base.home.sales', {
			url: '/sales',
			views: {
				'home-content': {
					templateUrl: 'views/home/sales/index.html'
				}
			},
			getBreadCrumbName: function(resourcesObj) {
				return resourcesObj.Views.Home.Sales.DisplayText;
			}
		});
}]);