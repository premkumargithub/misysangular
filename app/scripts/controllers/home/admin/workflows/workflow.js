/**
 *
 */

angular.module('voyagerUiApp').controller('AdminWorkflowsCtrl',
	function($scope, $state) {
		'use strict';

		$scope.onSelect = function(data) {
			if ($state.params.ResourceID !== data.ResourceID || $state.params.mode !== 'edit') {
				$state.go('base.home.admin.workflows.selection', {
					ResourceID: data.ResourceID,
					mode: 'edit'
				});
			}
		};
	});
