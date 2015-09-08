angular.module('voyagerUiApp').controller('SubmenusCtrl',
	function(resources, $scope) {
		'use strict';

		//Mapping of states to submenus, and submenu options to display text
		var menus, resourcesObj;
		resourcesObj = resources.get();

		menus = {
			'base.home.dashboard': {
				title: 'Dashboard',
				options: [
					{
						state: 'base.home.dashboard',
						name: 'Sales'
					},
					{
						state: 'base.home.dashboard',
						name: 'Purchasing'
					},
					{
						state: 'base.home.dashboard',
						name: 'Production'
					},
					{
						state: 'base.home.dashboard',
						name: 'Inventory Control'
					}
				]
			},
			'base.home.master-files': {
				title: 'Master Files',
				options: [
					{
						state: 'base.home.master-files.items',
						name: resourcesObj.Views.Home.MasterFiles.Submenus.MasterFiles.Items.DisplayText
					},
					{
						state: 'base.home.master-files.boms',
						name: resourcesObj.Views.Home.MasterFiles.Submenus.MasterFiles.Boms.DisplayText
					},
					{
						state: 'base.home.master-files.locations',
						name: resourcesObj.Views.Home.MasterFiles.Submenus.MasterFiles.Locations.DisplayText
					},
					{
						state: 'base.home.master-files.suppliers',
						name: resourcesObj.Views.Home.MasterFiles.Submenus.MasterFiles.Suppliers.DisplayText
					},
					{
						state: 'base.home.master-files.jobs',
						name: resourcesObj.Views.Home.MasterFiles.Submenus.MasterFiles.Jobs.DisplayText
					},
					{
						state: 'base.home.master-files.customers',
						name: 'Customers'
					}
				]
			},
			'base.home.planning': {
				title: 'Planning',
				options: [
					{
						state: 'base.home.planning.sales',
						name: 'Sales'
					},
					{
						state: 'base.home.planning.purchasing',
						name: 'Purchasing'
					},
					{
						state: 'base.home.planning.production',
						name: 'Production'
					}
				]
			},
			'base.home.sales': {
				title: 'Sales',
				options: [
					{
						state: 'base.home.sales.estimates',
						name: 'Estimates'
					},
					{
						state: 'base.home.sales.quotations',
						name: 'Quotations'
					},
					{
						state: 'base.home.sales.orders',
						name: 'Orders'
					},
					{
						state: 'base.home.sales.invoices',
						name: 'Invoices'
					}
				]
			},
			'base.home.purchasing': {
				title: 'Purchasing',
				options: [
					{
						state: 'base.home.purchasing.requisitions',
						name: 'Requisitions'
					},
					{
						state: 'base.home.purchasing.orders',
						name: 'Orders'
					},
					{
						state: 'base.home.purchasing.invoices',
						name: 'Invoices'
					}
				]
			},
			'base.home.production': {
				title: 'Production',
				options: [
					{
						state: 'base.home.production.orders',
						name: 'Orders'
					}
				]
			},
			'base.home.inventory-control': {
				title: 'Inventory Control',
				options: [
					{
						state: 'base.home.inventory-control.physical-inventory',
						name: 'Physical Inventory'
					},
					{
						state: 'base.home.inventory-control.transfers',
						name: 'Transfers'
					}
				]
			},
			'base.home.accounting': {
				title: 'Accounting',
				options: [
					{
						state: 'base.home.accounting.chart-of-accounts',
						name: 'Chart of Accounts'
					},
					{
						state: 'base.home.accounting.period-end',
						name: 'Period End'
					}
				]
			},
			'base.home.reports': {
				title: 'Reports',
				options: [
					{
						state: 'base.home.accounting.standard-reports',
						name: 'Standard Reports'
					},
					{
						state: 'base.home.accounting.custom-reports',
						name: 'Custom Reports'
					}
				]
			},
			'base.home.admin': {
				title: 'Administration',
				options: [
					{
						state: 'base.home.admin.company-profile',
						name: resourcesObj.Views.Home.Admin.Submenus.Admin.CompanyProfile.DisplayText
					},
            //					{
            //						state: 'base.home.admin.security-groups',
            //						name: 'Security Groups'
            //					},
					{
						state: 'base.home.admin.securityProfiles',
						name: 'Security Profiles'
					},
					{
						state: 'base.home.admin.departments',
						name: 'Departments'
					},
					{
						state: 'base.home.admin.workflows',
						name: 'Workflows'
					},
					{
						state: 'base.home.admin.users',
						name: resourcesObj.Views.Home.Admin.Submenus.Admin.Users.DisplayText
					},
					{
						state: 'base.home.admin.housekeeping',
						name: 'Housekeeping'
					}
				]
			}
		};

		$scope.submenus = menus['base.home.admin'];
		$scope.$on('$stateChangeSuccess', function(event, toState) {
			angular.forEach(menus, function(menu, topLevelStateName) {
				if (toState.name.indexOf(topLevelStateName) === 0) {
					$scope.submenus = menus[topLevelStateName];
				}
			});
		});
	});
