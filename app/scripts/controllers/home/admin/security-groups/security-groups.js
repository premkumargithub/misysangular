angular.module('voyagerUiApp').controller('AdminSecurityGroupsCtrl',
	function ($scope, $state) {
		'use strict';
		
		$scope.onSelect = function(data) {
			if($state.params.ResourceID !== data.ResourceID  || $state.params.mode !== 'edit'){
				$state.go('base.home.admin.security-groups.selection', {mode:'view', ResourceID:data.ResourceID});
			}
		};
	});
