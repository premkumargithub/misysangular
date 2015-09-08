angular.module('voyagerUiApp').controller('AccountingChartOfAccountsSelectionCtrl',
	function (ChangeEvents, $state, $scope, $stateParams, ViewModes) {
		'use strict';
		
		$scope.mode = ViewModes[$stateParams.mode];
		$scope.ResourceID = $stateParams.ResourceID;
		$scope.parentState = 'base.home.accounting.chart-of-accounts';

        $scope.onDelete = function(eventArgs, callback) {
            if(eventArgs.type === ChangeEvents.types.delete) {
                if(eventArgs.data.ResourceID === $scope.ResourceID) {
                    callback();
                }
            }
        };

        //Checks if mode is "add", and assumes that
        //the only way to add this resource is through this state's control panel
        $scope.onSave = function(eventArgs, callback) {
            if(eventArgs.type === ChangeEvents.types.save) {
                if($scope.mode === ViewModes.add) {
                    callback();
                }
            }
        };

        //React to SecurityGroup changes
        $scope.$on(ChangeEvents.names.Account, function(event, args) {
            $scope.onDelete(args, function() {
                $state.go($scope.parentState);
            });
            $scope.onSave(args, function() {
                $stateParams.ResourceID = args.data.ResourceID;
                $scope.ResourceID = args.data.ResourceID;
                $stateParams.mode = 'edit';
                $scope.mode = 'edit';

                $state.go($state.current, $stateParams, {
                    location: 'replace',
                    reload: true,
                    notify: false
                });
            });
        });
	});
