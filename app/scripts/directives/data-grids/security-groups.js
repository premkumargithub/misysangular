/**
 * @ngdoc directive
 * @name voyagerUiApp.directive:miSecurityGroupsDataGrid
 * @restrict E
 *
 * @description
 * A data grid which lists all security groups of the company using predefined columns.
 * 
 * @scope
 * @param {string=} editable An expression which evaluates to true or false. UI elements are added which enables creating, updating, and deleting entries.
 * @param {string=} onSelect A method on the scope which is essentially an event listener. The data of the selected record is passed to this method. **Example:** on-select="onAccountSelect(data)"
 *
 */

angular.module('voyagerUiApp').directive('miSecurityGroupsDataGrid',
	function(SecurityGroups, resources) {
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
					scope.refreshEvent = SecurityGroups.onChangeEvent;
					
					if(angular.isDefined(attrs.contractable)) {
						scope.contractable = true;
					} else {
						scope.contractable = false;
					}
					
					if(scope.editable === 'true') {
						throw 'Security Groups Data Grid cannot be editable because it has not defined create, update, or destroy requests.';
					}
					scope.destroy = function(data) {
						return SecurityGroups.delete(data.ResourceID);
					};
					scope.read = function(params) {
						return SecurityGroups.query(params);
					};
					scope.onSelect = function(data) {
						scope.onRowSelect({data: data});
					};
					
					scope.columns = [
						{id:'ID', title:scope.resourcesObj.Resources.SecurityGroup.Properties.ID.DisplayText, field:'ID', headerAttributes:{'class':'string-field'}, attributes:{'class':'string-field'}, width: 150},
						{id:'Description', title:scope.resourcesObj.Resources.SecurityGroup.Properties.Description.DisplayText, field:'Description', headerAttributes:{'class':'string-field'}, attributes:{'class':'string-field'}},
						{}
					];
				}
			}
		};
	});