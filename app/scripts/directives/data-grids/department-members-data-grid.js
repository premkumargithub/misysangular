angular.module('voyagerUiApp').directive('miDepartmentMembersDataGrid', function(UsersService, resources) {
	'use strict';

	return {
		restrict: 'E',
		replace: true,
		scope: {
			editable: '@',
			onRowSelect: '&onSelect'
		},
		templateUrl: 'views/directives/mi-data-grid.html',
		link: {
			pre: function(scope, element, attrs) {
				scope.resourcesObj = resources.get();
				//   scope.refreshEvent = UsersService.onChangeEvent;

				if (angular.isDefined(attrs.contractable)) {
					scope.contractable = true;
				} else {
					scope.contractable = false;
				}

				if (scope.editable === 'true') {
					throw 'Departments Items Data Grid cannot be editable because it has not defined create, update, or destroy requests.';
				}

				scope.read = function() {
					//console.log('department resource ID :' + scope.$parent.resourceId);
					return UsersService.getDepartmentMembers(scope.$parent.resourceId);
				};

				scope.transformDate = function(user) {
					if (user.LastLogin.length > 0) {
						var date = new Date(user.LastLogin);
						var hours = date.getHours();
						var minutes = date.getMinutes();
						var ampm = hours >= 12 ? 'pm' : 'am';
						hours = hours % 12;
						hours = hours ? hours : 12; // the hour '0' should be '12'
						minutes = minutes < 10 ? '0' + minutes : minutes;
						var strTime = hours + ':' + minutes + ' ' + ampm;
						return date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear() + '  ' + strTime;
					} else {
						return 'N/A';
					}
				};

				scope.columns = [
					{
						id: 'ID',
						title: scope.resourcesObj.Resources.Departments.Properties.DepartmentMembers.UserId.DisplayText,
						field: 'ID',
						headerAttributes: {
							'class': 'string-field'
						},
						attributes: {
							'class': 'string-field'
						},
						width: 200
					},
					{
						id: 'Name',
						title: scope.resourcesObj.Resources.Departments.Properties.DepartmentMembers.Name.DisplayText,
						field: 'Name',
						headerAttributes: {
							'class': 'string-field'
						},
						attributes: {
							'class': 'string-field'
						},
						width: 200
					},
					{
						id: 'LastLogin',
						title: scope.resourcesObj.Resources.Departments.Properties.DepartmentMembers.LastLoginDateTime.DisplayText,
						field: 'LastLogin',
						template: scope.transformDate,
						headerAttributes: {
							'class': 'date-field'
						},
						attributes: {
							'class': 'date-field text-center'
						},
						width: 250
					},
					{} //The auto-resize column when the main panel size changes
				];
			}
		}
	};
});
