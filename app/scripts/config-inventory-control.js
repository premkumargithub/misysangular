angular.module('voyagerUiApp').config(['$stateProvider', function ($stateProvider) {
	'use strict';
	
	$stateProvider
		.state('base.home.inventory-control', {
			url: '/inventory-control',
			views: {
				'home-content': {
					templateUrl: 'views/home/inventory-control/index.html'
				}
			},
			getBreadCrumbName: function(resourcesObj) {
				return resourcesObj.Views.Home.InventoryControl.DisplayText;
			}
		});
}]);