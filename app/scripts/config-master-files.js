angular.module('voyagerUiApp').config(['$stateProvider', function ($stateProvider) {
	'use strict';
	
	$stateProvider
		.state('base.home.master-files', {
			url: '/master-files',
			views: {
				'home-content': {
					templateUrl: 'views/home/master-files/index.html'
				}
			},
			getBreadCrumbName: function(resourcesObj) {
				return resourcesObj.Views.Home.MasterFiles.Submenus.MasterFiles.DisplayText;
			}
		})
		.state('base.home.master-files.items', {
			url: '/items',
			views: {
				'master-files-content': {
					controller: 'MasterFilesItemsCtrl',
					templateUrl: 'views/home/master-files/items/items.html'
				}
			},
			getBreadCrumbName: function(resourcesObj) {
				return resourcesObj.Views.Home.MasterFiles.Submenus.MasterFiles.Items.DisplayText;
			}
		})
		.state('base.home.master-files.items.selection', {
			url: '/:mode/:ResourceID',
			views: {
				'items-content': {
					controller: 'ItemsSelectionCtrl',
					templateUrl: 'views/home/master-files/items/items-selection.html'
				}
			},
			resolve: {
				mode: ['$stateParams', function($stateParams) {
					if($stateParams.mode.length === 0) {
						$stateParams.mode = 'edit';
					}
					return $stateParams.mode;
				}]
			}
		});
	
	$stateProvider
		.state('base.home.master-files.boms', {
			url: '/bills-of-material',
			views: {
				'master-files-content': {
					controller: 'MasterFilesBomsCtrl',
					templateUrl: 'views/home/master-files/boms/boms.html'
				}
			},
			getBreadCrumbName: function(resourcesObj) {
				return resourcesObj.Views.Home.MasterFiles.Submenus.MasterFiles.Boms.DisplayText;
			}
		})
		.state('base.home.master-files.boms.selection', {
			url: '/:mode/:ResourceID',
			views: {
				'boms-selection-content': {
					controller: 'BomsSelectionCtrl',
					templateUrl: 'views/home/master-files/boms/boms-selection.html'
				}
			},
			resolve: {
				mode: ['$stateParams', function($stateParams) {
					if($stateParams.mode.length === 0) {
						$stateParams.mode = 'edit';
					}
					return $stateParams.mode;
				}]
			}
		});
	
	$stateProvider
		.state('base.home.master-files.suppliers', {
			url: '/suppliers',
			views: {
				'master-files-content': {
					controller: 'MasterFilesSuppliersCtrl',
					templateUrl: 'views/home/master-files/suppliers/suppliers.html'
				}
			},
			getBreadCrumbName: function(resourcesObj) {
				return resourcesObj.Views.Home.MasterFiles.Submenus.MasterFiles.Suppliers.DisplayText;
			}
		})
		.state('base.home.master-files.suppliers.selection', {
			url: '/:mode/:ResourceID',
			views: {
				'suppliers-selection-content': {
					controller: 'SuppliersSelectionCtrl',
					templateUrl: 'views/home/master-files/suppliers/suppliers-selection.html'
				}
			},
			resolve: {
				mode: ['$stateParams', function($stateParams) {
                    if($stateParams.mode.length === 0) {
						$stateParams.mode = 'edit';
					}
					return $stateParams.mode;
				}]
			}
		})
	;
	
	$stateProvider
		.state('base.home.master-files.jobs', {
			url: '/jobs',
			views: {
				'master-files-content': {
					controller: 'MasterFilesJobsCtrl',
					templateUrl: 'views/home/master-files/jobs/jobs.html'
				}
			},
			getBreadCrumbName: function(resourcesObj) {
				return resourcesObj.Views.Home.MasterFiles.Submenus.MasterFiles.Jobs.DisplayText;
			}
		})
		.state('base.home.master-files.jobs.selection', {
			url: '/:mode/:ResourceID',
			views: {
				'jobs-content': {
					controller: 'JobsSelectionCtrl',
					templateUrl: 'views/home/master-files/jobs/jobs-selection.html'
				}
			},
			resolve: {
				mode: ['$stateParams', function($stateParams) {
					if($stateParams.mode.length === 0) {
						$stateParams.mode = 'edit';
					}
					return $stateParams.mode;
				}]
			}
		})
		.state('base.home.master-files.locations', {
			url: '/locations',
			views: {
				'master-files-content': {
					controller: 'MasterFilesLocationsCtrl',
				  templateUrl: 'views/home/master-files/locations/locations.html'
				}
			},
			getBreadCrumbName: function(resourcesObj) {
				return resourcesObj.Views.Home.MasterFiles.Submenus.MasterFiles.Locations.DisplayText;
			}
		})
		.state('base.home.master-files.locations.selection', {
			url: '/:mode/:ResourceID',
			views: {
				'locations-selection-content': {
					controller: 'MasterFilesLocationsSelectionCtrl',
				  templateUrl: 'views/home/master-files/locations/locations-selection.html'
				}
			}
		})
		.state('base.home.master-files.look-ups', {
			url: '/look-ups',
			views: {
				'master-files-content': {
					template:'<h1 style="text-align:center;">At Look Ups</h1>'
				}
			}
		})
		.state('base.home.master-files.product-code', {
			url: '/product-code',
			views: {
				'master-files-content': {
					template:'<h1 style="text-align:center;">At Product Code</h1>'
				}
			},
			getBreadCrumbName: function(resourcesObj) {
				return resourcesObj.Views.Home.MasterFiles.Submenus.LookUps.ProductCode.DisplayText;
			}
		});
		
	$stateProvider
		.state('base.home.master-files.customers', {
			url: '/customers',
			views: {
				'master-files-content': {
					controller: 'MasterFilesCustomersCtrl',
					templateUrl: 'views/home/master-files/customers/index.html'
				}
			},
			getBreadCrumbName: function(resourcesObj) {
				return resourcesObj.Views.Home.MasterFiles.Submenus.MasterFiles.Customers.DisplayText;
			}
		});
}]);