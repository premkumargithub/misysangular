angular.module('voyagerUiApp').controller('AccountingChartOfAccountsCtrl',
	function ($scope, $state) {
		'use strict';
		
		$scope.onSelect = function(data) {
            console.log('ok');
            console.log(data);
			if($state.params.ResourceID !== data.ResourceID  || $state.params.mode !== 'edit'){
				$state.go('base.home.accounting.chart-of-accounts.selection', {ResourceID:data.ResourceID, mode:'edit'});
			}
		};
	});
