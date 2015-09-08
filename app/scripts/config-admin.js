angular.module('voyagerUiApp').config(['$stateProvider', function($stateProvider) {
	'use strict';

	$stateProvider
		.state('base.home.admin', {
			url: '/admin',
			views: {
				'home-content': {
					templateUrl: 'views/home/admin/index.html'
				}
			},
			getBreadCrumbName: function(resourcesObj) {
				return resourcesObj.Views.Home.Admin.Submenus.Admin.DisplayText;
			}
		})
		.state('base.home.admin.users', {
			url: '/users',
			views: {
				'admin-content': {
					controller: 'AdminUsersCtrl',
					templateUrl: 'views/home/admin/users/admin-users.html'
				}
			},
			getBreadCrumbName: function(resourcesObj) {
				return resourcesObj.Views.Home.Admin.Submenus.Admin.Users.DisplayText;
			}
		})
		.state('base.home.admin.users.selection', {
			url: '/:mode/:ResourceID',
			views: {
				'admin-content': {
					controller: 'AdminUsersSelectionCtrl',
					templateUrl: 'views/home/admin/users/admin-users-selection.html'
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

	.state('base.home.admin.departments', {
			url: '/departments',
			views: {
				'admin-content': {
					controller: 'AdminDepartmentsCtrl',
					templateUrl: 'views/home/admin/departments/departments.html'
				}
			},
			getBreadCrumbName: function(resourcesObj) {
				return resourcesObj.Views.Home.Admin.Submenus.Admin.Departments.DisplayText;
			}
		}).state('base.home.admin.departments.selection', {
			url: '/:mode/:ResourceID',
			views: {
				'admin-content': {
					controller: 'AdminDepartmentSelectionCtrl',
					templateUrl: 'views/home/admin/departments/departments-selection.html'
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
		.state('base.home.admin.securityProfiles', {
			url: '/securityProfiles',
			views: {
				'admin-content': {
					controller: 'AdminSecurityProfilesCtrl',
					templateUrl: 'views/home/admin/security-profiles/security-profiles.html'
				}
			},
			getBreadCrumbName: function(resourcesObj) {
				return resourcesObj.Views.Home.Admin.Submenus.Admin.SecurityProfiles.DisplayText;
			}
		}).state('base.home.admin.securityProfiles.selection', {
			url: '/:mode/:ResourceID',
			views: {
				'admin-content': {
					controller: 'AdminSecurityProfilesSelectionCtrl',
					templateUrl: 'views/home/admin/security-profiles/security-profiles-selection.html'
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
		.state('base.home.admin.workflows', {
			url: '/workflows',
			views: {
				'admin-content': {
					controller: 'AdminWorkflowsCtrl',
					templateUrl: 'views/home/admin/workflows/workflow.html'
				}
			},
			getBreadCrumbName: function(resourcesObj) {
				return resourcesObj.Views.Home.Admin.Submenus.Admin.Workflows.DisplayText;
			}
		})
		.state('base.home.admin.workflows.selection', {
			url: '/:mode/:ResourceID',
			views: {
				'admin-content': {
					controller: 'AdminWorkflowsSelectionCtrl',
					templateUrl: 'views/home/admin/workflows/workflow-selection.html'
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
		.state('base.home.admin.customers', {
			url: '/customers',
			views: {
				'admin-content': {
					template: '<h1 style="text-align:center;">Customers</h1>'
				}
			},
			getBreadCrumbName: function(resourcesObj) {
				return resourcesObj.Views.Home.Admin.Submenus.Admin.Customers.DisplayText;
			}
		})
		.state('base.home.admin.housekeeping', {
			url: '/customers',
			views: {
				'admin-content': {
					template: '<h1 style="text-align:center;">Housekeeping</h1>'
				}
			},
			getBreadCrumbName: function(resourcesObj) {
				return resourcesObj.Views.Home.Admin.Submenus.Admin.Housekeeping.DisplayText;
			}
		})
		.state('base.home.admin.security-groups', {
			url: '/security-groups',
			views: {
				'admin-content': {
					controller: 'AdminSecurityGroupsCtrl',
					templateUrl: 'views/home/admin/security-groups/security-groups.html'
				}
			},
			getBreadCrumbName: function(resourcesObj) {
				return resourcesObj.Views.Home.Admin.Submenus.Admin.SecurityGroups.DisplayText;
			}
		})
		.state('base.home.admin.security-groups.selection', {
			url: '/:mode/:ResourceID',
			views: {
				'security-groups-content': {
					controller: 'AdminSecurityGroupsSelectionCtrl',
					templateUrl: 'views/home/admin/security-groups/security-groups-selection.html'
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
		.state('base.home.admin.company-profile', {
			url: '/company-profile',
			views: {
				'admin-content': {
					controller: 'CompanyProfileCtrl',
					templateUrl: 'views/home/admin/company-profile/company-profile.html'
				}
			},
			getBreadCrumbName: function(resourcesObj) {
				return resourcesObj.Views.Home.Admin.Submenus.Admin.CompanyProfile.DisplayText;
			}
		});
}]);
