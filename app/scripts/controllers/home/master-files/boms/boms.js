angular.module('voyagerUiApp').controller('MasterFilesBomsCtrl',
	function ($scope, $state) {
		'use strict';
			
		$scope.onSelect = function(data) {
			if($state.params.ResourceID !== data.ResourceID  || $state.params.mode !== 'edit'){
				$state.go('base.home.master-files.boms.selection', {ResourceID:data.ResourceID, mode:'edit'});
			}
		};
	});
