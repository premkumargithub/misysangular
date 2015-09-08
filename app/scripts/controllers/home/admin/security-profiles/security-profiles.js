angular.module('voyagerUiApp').controller('AdminSecurityProfilesCtrl',
	function ($scope, $state) {
		'use strict';

		$scope.onSelect = function (data) {
			if ($state.params.ResourceID !== data.ResourceID || $state.params.mode !== 'edit') {
				$state.go('base.home.admin.securityProfiles.selection', {
					mode: 'edit',
					ResourceID: data.ResourceID
				});
			}
		};
	});