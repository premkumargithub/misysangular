angular.module('voyagerUiApp').directive('miDepartmentDataGrid',
	function(Departments, resources) {
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
					scope.refreshEvent = Departments.onChangeEvent;

					if (angular.isDefined(attrs.contractable)) {
						scope.contractable = true;
					} else {
						scope.contractable = false;
					}

					if (scope.editable === 'true') {
						throw 'Departments Items Data Grid cannot be editable because it has not defined create, update, or destroy requests.';
					}
					scope.destroy = function(data) {
						return Departments.delete(data.ResourceID);
					};
					scope.read = function(params) {
						return Departments.query(params);
					};
					scope.onSelect = function(data) {
						scope.onRowSelect({
							data: data
						});
					};
					scope.columns = [
						{
							id: 'DepartmentID',
							title: scope.resourcesObj.Resources.Departments.Properties.DepartmentID.DisplayText,
							field: 'DepartmentID',
							headerAttributes: {
								'class': 'string-field'
							},
							attributes: {
								'class': 'string-field'
							},
							width: 200
						},
						{
							id: 'DepartmentName',
							title: scope.resourcesObj.Resources.Departments.Properties.DepartmentName.DisplayText,
							field: 'DepartmentName',
							headerAttributes: {
								'class': 'string-field'
							},
							attributes: {
								'class': 'string-field'
							},
							width: 200
						},
						{
							id: 'CreateInternalMessages',
							title: scope.resourcesObj.Resources.Departments.Properties.OutgoingInternalMessages.DisplayText,
							//	template: Items.trackingToString,
							field: 'CreateInternalMessages',
							headerAttributes: {
								'class': 'checkbox-field'
							},
							attributes: {
								'class': 'checkbox-field'
							},
							width: 250

						},
						{
							id: 'CreateExternalMessages',
							title: scope.resourcesObj.Resources.Departments.Properties.OutgoingExternalMessages.DisplayText,
							field: 'CreateExternalMessages',
							headerAttributes: {
								'class': 'checkbox-field'
							},
							attributes: {
								'class': 'checkbox-field'
							},
							width: 250
						},
						{
							id: 'AcceptInternalMessages',
							title: scope.resourcesObj.Resources.Departments.Properties.IncomingInternalMessages.DisplayText,
							field: 'AcceptInternalMessages',
							headerAttributes: {
								'class': 'checkbox-field'
							},
							attributes: {
								'class': 'checkbox-field'
							},
							width: 250
						},
						{
							id: 'AcceptExternalMessages',
							title: scope.resourcesObj.Resources.Departments.Properties.IncomingExternalMessages.DisplayText,
							field: 'AcceptExternalMessages',
							headerAttributes: {
								'class': 'checkbox-field'
							},
							attributes: {
								'class': 'checkbox-field'
							},
							width: 250
						},
						{} //The auto-resize column when the main panel size changes
					];

				}
			}
		};
	});
