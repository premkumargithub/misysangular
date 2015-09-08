/**
 * @ngdoc directive
 * @name voyagerUiApp.directive:miItemsDataGrid
 * @restrict E
 *
 * @description
 * A data grid which lists all items of the company using predefined columns.
 * 
 * @scope
 * @param {string=} editable An expression which evaluates to true or false. UI elements are added which enables creating, updating, and deleting entries.
 * @param {string=} onSelect A method on the scope which is essentially an event listener. The data of the selected record is passed to this method. **Example:** on-select="onAccountSelect(data)"
 *
 */

angular.module('voyagerUiApp').directive('miItemsDataGrid',
	function(Items, resources) {
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
					scope.refreshEvent = Items.onChangeEvent;
					
					if(scope.editable === 'true') {
						throw 'Items Data Grid cannot be editable because it has not defined create, update, or destroy requests.';
					}
					
					if(angular.isDefined(attrs.contractable)) {
						scope.contractable = true;
					} else {
						scope.contractable = false;
					}
					
					scope.destroy = function(data) {
						return Items.delete(data.ResourceID);
					};
					scope.read = function(params) {
						return Items.query(params);
					};
					scope.onSelect = function(data) {
						scope.onRowSelect({data: data});
					};
					
					scope.columns = [
						{id:'ID', title:scope.resourcesObj.Resources.Item.Properties.ID.DisplayText, field:'ID', headerAttributes:{'class':'string-field'}, attributes:{'class':'string-field'}, width:125},
						{id:'Description', title:scope.resourcesObj.Resources.Item.Properties.Description.DisplayText, field:'Description', headerAttributes:{'class':'string-field'}, attributes:{'class':'string-field'}, width:175},
						{id:'StandardCost', title:scope.resourcesObj.Resources.Item.Properties.StandardCost.DisplayText, field:'StandardCost', headerAttributes:{'class':'number-field'}, attributes:{'class':'number-field'}, width:150},
						{id:'RecentCost', title:scope.resourcesObj.Resources.Item.Properties.RecentCost.DisplayText, field:'RecentCost', headerAttributes:{'class':'number-field'}, attributes:{'class':'number-field'}, width:150},
						{id:'Reference',  title:scope.resourcesObj.Resources.Item.Properties.Reference.DisplayText, field:'Reference', headerAttributes:{'class':'string-field'}, attributes:{'class':'string-field'}, width:160},
						{id:'Weight', title:scope.resourcesObj.Resources.Item.Properties.Weight.DisplayText, field:'Weight', headerAttributes:{'class':'number-field'}, attributes:{'class':'number-field'}, width:125},
						{} //The auto-resize column when the main panel size changes
					];
				}
			}
		};
	});