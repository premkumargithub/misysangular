angular.module('voyagerUiApp').config(['$stateProvider', function ($stateProvider) {
	'use strict';
	$stateProvider
		.state('base.home.purchasing', {
			url: '/purchasing',
			views: {
				'home-content': {
					templateUrl: 'views/home/purchasing/index.html'
				}
			},
			getBreadCrumbName: function(resourcesObj) {
				return resourcesObj.Views.Home.Purchasing.Submenus.Purchasing.DisplayText;
			}
		})
		.state('base.home.purchasing.supply-schedule', {
			url: '/supply-schedule',
			views: {
				'purchasing-content': {
					template: '<h1 style="text-align:center;">At Supply Schedule</h1>'
				}
			},
			getBreadCrumbName: function(resourcesObj) {
				return resourcesObj.Views.Home.Purchasing.Submenus.Purchasing.SupplySchedule.DisplayText;
			}
		})
		.state('base.home.purchasing.purchase-orders', {
			url: '/purchase-orders',
			views: {
				'purchasing-content': {
					template: '<h1 style="text-align:center;">At Purchase Orders</h1>'
				}
			},
			getBreadCrumbName: function(resourcesObj) {
				return resourcesObj.Views.Home.Purchasing.Submenus.Purchasing.PurchaseOrders.DisplayText;
			}
		})
		.state('base.home.purchasing.process-mrp', {
			url: '/process-mrp',
			views: {
				'purchasing-content': {
					template: '<h1 style="text-align:center;">At Process MRP</h1>'
				}
			},
			getBreadCrumbName: function(resourcesObj) {
				return resourcesObj.Views.Home.Purchasing.Submenus.Purchasing.ProcessMRP.DisplayText;
			}
		})
		.state('base.home.purchasing.print-send-orders', {
			url: '/print-send-orders',
			views: {
				'purchasing-content': {
					template: '<h1 style="text-align:center;">At Print/Send Orders</h1>'
				}
			},
			getBreadCrumbName: function(resourcesObj) {
				return resourcesObj.Views.Home.Purchasing.Submenus.Purchasing.PrintSendOrders.DisplayText;
			}
		})
		.state('base.home.purchasing.purge-closed-orders', {
			url: '/purge-closed-orders',
			views: {
				'purchasing-content': {
					template: '<h1 style="text-align:center;">At Purge Closed Orders</h1>'
				}
			},
			getBreadCrumbName: function(resourcesObj) {
				return resourcesObj.Views.Home.Purchasing.Submenus.Purchasing.PurgeClosedOrders.DisplayText;
			}
		})
		.state('base.home.purchasing.purchasing-reports', {
			url: '/purchasing-reports',
			views: {
				'purchasing-content': {
					template: '<h1 style="text-align:center;">At Purchasing Reports</h1>'
				}
			},
			getBreadCrumbName: function(resourcesObj) {
				return resourcesObj.Views.Home.Purchasing.Submenus.Purchasing.PurchasingReports.DisplayText;
			}
		})
		.state('base.home.purchasing.additional-costs', {
			url: '/additional-costs',
			views: {
				'purchasing-content': {
					template: '<h1 style="text-align:center;">At Additional Costs</h1>'
				}
			},
			getBreadCrumbName: function(resourcesObj) {
				return resourcesObj.Views.Home.Purchasing.Submenus.Purchasing.AdditionalCosts.DisplayText;
			}
		})
	;
}]);