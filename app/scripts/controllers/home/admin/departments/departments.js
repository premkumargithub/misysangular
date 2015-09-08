angular.module('voyagerUiApp').controller('AdminDepartmentsCtrl',
	function($scope, $state) {
		'use strict';

		$scope.onSelect = function(data) {
			if ($state.params.ResourceID !== data.ResourceID || $state.params.mode !== 'edit') {
				$state.go('base.home.admin.departments.selection', {
					ResourceID: data.ResourceID,
					mode: 'edit'
				});
			}
		};
	});
