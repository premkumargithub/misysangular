angular.module('voyagerUiApp').config(
	function ($stateProvider) {
		'use strict';
		
		$stateProvider.state('base.home.dashboard', {
			url: '',
			views: {
				'home-content': {
					templateUrl: 'views/home/dashboard/index.html',
					controller: 'DashboardCtrl'
				}
			},
			getBreadCrumbName: function(resourcesObj) {
				return resourcesObj.Views.Home.Dashboard.DisplayText;
			}
		});
	});