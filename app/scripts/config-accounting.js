angular.module('voyagerUiApp').config(['$stateProvider', function($stateProvider) {
	'use strict';

	$stateProvider
		.state('base.home.accounting', {
			url: '/accounting',
			views: {
				'home-content': {
					templateUrl: 'views/home/accounting/index.html'
				}
			},
			getBreadCrumbName: function(resourcesObj) {
				return resourcesObj.Views.Home.Accounting.Submenus.Accounting.DisplayText;
			}
		})
		.state('base.home.accounting.period-end', {
			url: '/period-end',
			views: {
				'accounting-content': {
					template: '<h1 style="text-align:center;">At Period End</h1>'
				}
			},
			getBreadCrumbName: function(resourcesObj) {
				return resourcesObj.Views.Home.Accounting.Submenus.Accounting.PeriodEnd.DisplayText;
			}
		})
		.state('base.home.accounting.cost-adjustment', {
			url: '/cost-adjustment',
			views: {
				'accounting-content': {
					//controller: 'AccountingCostAdjustmentCtrl',
					template: '<h1 style="text-align:center;">At Cost Adjustment</h1>'
				}
			},
			getBreadCrumbName: function(resourcesObj) {
				return resourcesObj.Views.Home.Accounting.Submenus.Accounting.CostAdjustment.DisplayText;
			}
		})
		.state('base.home.accounting.chart-of-accounts', {
			url: '/chart-of-accounts',
			views: {
				'accounting-content': {
					controller: 'AccountingChartOfAccountsCtrl',
					templateUrl: 'views/home/accounting/chart-of-accounts/chart-of-accounts.html'
				}
			},
			getBreadCrumbName: function(resourcesObj) {
				return resourcesObj.Views.Home.Accounting.Submenus.Accounting.ChartOfAccounts.DisplayText;
			}
		})
		.state('base.home.accounting.chart-of-accounts.selection', {
			url: '/:mode/:ResourceID',
			views: {
				'chart-of-accounts-content': {
					controller: 'AccountingChartOfAccountsSelectionCtrl',
					templateUrl: 'views/home/accounting/chart-of-accounts/chart-of-accounts-selection.html'
				}
			},
			resolve: {
				mode: ['$stateParams', function($stateParams) {
					if ($stateParams.mode.length === 0) {
						$stateParams.mode = 'edit';
					}
					return $stateParams.mode;
				}]
			}
		})
		.state('base.home.accounting.accounts-sets', {
			url: '/accounts-sets',
			views: {
				'accounting-content': {
					template: '<h1 style="text-align:center;">At Accounts Sets</h1>'
				}
			},
			getBreadCrumbName: function(resourcesObj) {
				return resourcesObj.Views.Home.Accounting.Submenus.Accounting.AccountsSets.DisplayText;
			}
		})
		.state('base.home.accounting.accounting-reports', {
			url: '/accounting-reports',
			views: {
				'accounting-content': {
					template: '<h1 style="text-align:center;">At Accounting Reports</h1>'
				}
			},
			getBreadCrumbName: function(resourcesObj) {
				return resourcesObj.Views.Home.Accounting.Submenus.Accounting.AccountingReports.DisplayText;
			}
		})
		.state('base.home.accounting.tax-services', {
			url: '/tax-services',
			views: {
				'accounting-content': {
					template: '<h1 style="text-align:center;">At Tax Services</h1>'
				}
			},
			getBreadCrumbName: function(resourcesObj) {
				return resourcesObj.Views.Home.Accounting.Submenus.Accounting.TaxServices.DisplayText;
			}
		})
		.state('base.home.accounting.currency-services', {
			url: '/currency-services',
			views: {
				'accounting-content': {
					template: '<h1 style="text-align:center;">At Currency Services</h1>'
				}
			},
			getBreadCrumbName: function(resourcesObj) {
				return resourcesObj.Views.Home.Accounting.Submenus.Accounting.CurrencyServices.DisplayText;
			}
		});
}]);
