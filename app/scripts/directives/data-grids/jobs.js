/**
 * @ngdoc directive
 * @name voyagerUiApp.directive:miJobsDataGrid
 * @restrict E
 *
 * @description
 * A data grid which lists all jobs of the company using predefined columns.
 * 
 * @scope
 * @param {string=} editable An expression which evaluates to true or false. UI elements are added which enables creating, updating, and deleting entries.
 * @param {string=} onSelect A method on the scope which is essentially an event listener. The data of the selected record is passed to this method. **Example:** on-select="onAccountSelect(data)"
 *
 */

angular.module('voyagerUiApp').directive('miJobsDataGrid',
	function(Jobs, resources) {
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
					scope.refreshEvent = Jobs.onChangeEvent;
					
					if(angular.isDefined(attrs.contractable)) {
						scope.contractable = true;
					} else {
						scope.contractable = false;
					}
					
					if(scope.editable === 'true') {
						throw 'Jobs Data Grid cannot be editable because it has not defined create, update, or destroy requests.';
					}
					scope.destroy = function(data) {
						return Jobs.delete(data.ResourceID);
					};
					scope.read = function(params) {
						return Jobs.query(params);
					};
					scope.onSelect = function(data) {
						scope.onRowSelect({data: data});
					};
					
					scope.columns = [
						{id:'ID', title:scope.resourcesObj.Resources.Jobs.Properties.ID.DisplayText, field:'ID', headerAttributes:{'class':'string-field'}, attributes:{'class':'string-field'}, width:125},
						{id:'Name', title:scope.resourcesObj.Resources.Jobs.Properties.Name.DisplayText, field:'Name', headerAttributes:{'class':'string-field'}, attributes:{'class':'string-field'}, width:250},
						{id:'Status', title:scope.resourcesObj.Resources.Jobs.Properties.Status.DisplayText, field:'Status', template:Jobs.statusToString, headerAttributes:{'class':'string-field'}, attributes:{'class':'string-field'}, width:125},
						{id:'AccountSetID', title:scope.resourcesObj.Resources.Jobs.Properties.AccountSetID.DisplayText, field:'AccountSetID', headerAttributes:{'class':'string-field'}, attributes:{'class':'string-field'}, width:125},
						{id:'DocumentPath', title:scope.resourcesObj.Resources.Jobs.Properties.DocumentPath.DisplayText, field:'DocumentPath', headerAttributes:{'class':'string-field'}, attributes:{'class':'string-field'}, width:175},
						{}
					];
				}
			}
		};
	});