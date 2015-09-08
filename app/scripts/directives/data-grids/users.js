/**
 * @ngdoc directive
 * @name voyagerUiApp.directive:miUsersDataGrid
 * @restrict E
 *
 * @description
 * A data grid which lists all users of the company using predefined columns.
 *
 * @scope
 * @param {string=} editable An expression which evaluates to true or false. UI elements are added which enables creating, updating, and deleting entries.
 * @param {string=} onSelect A method on the scope which is essentially an event listener. The data of the selected record is passed to this method. **Example:** on-select="onAccountSelect(data)"
 *
 */

angular.module('voyagerUiApp').directive('miUsersDataGrid',
	function(UsersService, resources) {
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
					scope.refreshEvent = UsersService.onChangeEvent;

					if (angular.isDefined(attrs.contractable)) {
						scope.contractable = true;
					} else {
						scope.contractable = false;
					}

					if (scope.editable === 'true') {
						throw 'Users Data Grid cannot be editable because it has not defined create, update, or destroy requests.';
					}
					scope.destroy = function(data) {
						return UsersService.delete(data.ResourceID);
					};
					scope.read = function(params) {
						return UsersService.query(params);
					};
					scope.onSelect = function(data) {
						scope.onRowSelect({
							data: data
						});
					};

					scope.columns = [
						{
							id: 'ID',
							title: scope.resourcesObj.Resources.User.Properties.ID.DisplayText,
							field: 'ID',
							headerAttributes: {
								'class': 'string-field'
							},
							attributes: {
								'class': 'string-field'
							},
							width: 150
						},
						{
							id: 'Name',
							title: scope.resourcesObj.Resources.User.Properties.Name.DisplayText,
							field: 'Name',
							headerAttributes: {
								'class': 'string-field'
							},
							attributes: {
								'class': 'string-field'
							},
							width: 175
						},
						{
							id: 'AccountStatus',
							title: scope.resourcesObj.Resources.User.Properties.AccountStatus.DisplayText,
							field: 'AccountStatus',
							template: function(user) {
								return user.getAccountStatusString();
							},
							headerAttributes: {
								'class': 'string-field'
							},
							attributes: {
								'class': 'string-field'
							},
							width: 150
						},
						{
							id: 'DepartmentResourceID ',
							title: scope.resourcesObj.Resources.User.Properties.Department.DisplayText,
							field: 'DepartmentResourceID ',
							headerAttributes: {
								'class': 'string-field'
							},
							attributes: {
								'class': 'string-field'
							},
							width: 150
						},
						{
							id: 'UserProfileResourceID ',
							title: scope.resourcesObj.Resources.User.Properties.Workflow.DisplayText,
							field: 'UserProfileResourceID ',
							headerAttributes: {
								'class': 'string-field'
							},
							attributes: {
								'class': 'string-field'
							},
							width: 150
						},
						{
							id: 'SecurityGroupID',
							title: scope.resourcesObj.Resources.User.Properties.SecurityGroupID.DisplayText,
							field: 'SecurityGroupID',
							headerAttributes: {
								'class': 'string-field'
							},
							attributes: {
								'class': 'string-field'
							},
							width: 150
						},
						{} //The auto-resize column when the main panel size changes
					];
				}
			}
		};
	});
