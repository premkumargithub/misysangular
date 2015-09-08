angular.module('voyagerUiApp').controller('MasterFilesLocationsCtrl',
	function ($scope, $state) {
		'use strict';
			
		$scope.onSelect = function(data) {
			if($state.params.ResourceID !== data.ResourceID  || $state.params.mode !== 'edit'){
				$state.go('base.home.master-files.locations.selection', {ResourceID:data.ResourceID, mode:'edit'});
			}
		};
  });
