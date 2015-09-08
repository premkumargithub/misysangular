angular.module('voyagerUiApp').controller('MasterFilesSuppliersCtrl',
	function ($scope, $state) {
		'use strict';
		
		//Update if statement when $state.includes starts accepting stateParams as 2nd argument
		$scope.onSelect = function(data) {
			if($state.params.ResourceID !== data.ResourceID  || $state.params.mode !== 'edit'){
				$state.go('base.home.master-files.suppliers.selection', {ResourceID:data.ResourceID, mode:'edit'});
			}
		};
	});
