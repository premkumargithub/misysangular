/**
 * @ngdoc directive
 * @name voyagerUiApp.directive:miLocationItemsDataGrid
 * @restrict E
 *
 * @description
 * A data grid which lists locations of an item using predefined columns.
 * 
 * @scope
 * @param {string} locationResourceId An expression which evaluates to an existing location ResourceID.
 * @param {string=} editable An expression which evaluates to true or false. UI elements are added which enables creating, updating, and deleting entries.
 * @param {string=} onSelect A method on the scope which is essentially an event listener. The data of the selected record is passed to this method. **Example:** on-select="onAccountSelect(data)"
 *
 */

angular.module('voyagerUiApp').directive('miLocationAlternatesDataGrid',
	function(Items, Locations, resources) {
		'use strict';
		
		return {
			restrict: 'E',
			replace: true,
			scope: {
				locationResourceId: '=',
				editable: '@',
				onRowSelect: '&onSelect'
			},
			templateUrl: 'views/directives/mi-data-grid.html',
			link: {
				pre: function(scope, element, attrs) {
					scope.resourcesObj = resources.get();
					scope.refreshEvent = Locations.onChangeEvent;
					
					if(angular.isDefined(attrs.contractable)) {
						scope.contractable = true;
					} else {
						scope.contractable = false;
					}
					
					if(scope.editable === 'true') {
						throw 'Location Items Data Grid cannot be editable because it has not defined create, update, or destroy requests.';
					}
					scope.read = function(params) {
						return Locations.getLocationItems(scope.locationResourceId, params);
					};
					scope.onSelect = function(data) {
						scope.onRowSelect({data: data});
					};
					
					scope.columns = [
						{id:'ID', title:scope.resourcesObj.Resources.Item.Properties.ID.DisplayText, field:'ID', headerAttributes:{'class':'string-field'}, attributes:{'class':'string-field'}, width:100},
						{id:'Description', title:scope.resourcesObj.Resources.Item.Properties.Description.DisplayText, field:'Description', headerAttributes:{'class':'string-field'}, attributes:{'class':'string-field'}, width:200},
						{id:'AlternateLocationID', title:scope.resourcesObj.Resources.Item.Properties.Tracking.DisplayText, template:Items.trackingToString, field:'Tracking', headerAttributes:{'class':'string-field'}, attributes:{'class':'string-field'}, width:225},
						{id:'Pick', title:scope.resourcesObj.Resources.Item.Properties.Pick.DisplayText, field:'Pick', headerAttributes:{'class':'string-field'}, attributes:{'class':'string-field'}, width:150},
						{id:'MinimumLevel', title:scope.resourcesObj.Resources.Item.Properties.MinimumLevel.DisplayText, field:'MinimumLevel', headerAttributes:{'class':'number-field'}, attributes:{'class':'number-field'}, width:100},
						{id:'ReorderLevel', title:scope.resourcesObj.Resources.Item.Properties.ReorderLevel.DisplayText, field:'ReorderLevel', headerAttributes:{'class':'number-field'}, attributes:{'class':'number-field'}, width:100},
						{id:'MaximumLevel', title:scope.resourcesObj.Resources.Item.Properties.MaximumLevel.DisplayText, field:'MaximumLevel', headerAttributes:{'class':'number-field'}, attributes:{'class':'number-field'}, width:100},
						{id:'ReorderQuantity', title:scope.resourcesObj.Resources.Item.Properties.ReorderQuantity.DisplayText, field:'ReorderQuantity', headerAttributes:{'class':'number-field'}, attributes:{'class':'number-field'}, width:100},
						{id:'StockQuantity', title:scope.resourcesObj.Resources.Item.Properties.StockQuantity.DisplayText, field:'StockQuantity', headerAttributes:{'class':'number-field'}, attributes:{'class':'number-field'}, width:100},
						{id:'WipQuantity', title:scope.resourcesObj.Resources.Item.Properties.WipQuantity.DisplayText, field:'WipQuantity', headerAttributes:{'class':'number-field'}, attributes:{'class':'number-field'}, width:100},
						{id:'ReserveQuantity', title:scope.resourcesObj.Resources.Item.Properties.ReserveQuantity.DisplayText, field:'ReserveQuantity', headerAttributes:{'class':'number-field'}, attributes:{'class':'number-field'}, width:100},
						{id:'OnOrderQuantity', title:scope.resourcesObj.Resources.Item.Properties.OnOrderQuantity.DisplayText, field:'OnOrderQuantity', headerAttributes:{'class':'number-field'}, attributes:{'class':'number-field'}, width:100},
						{id:'LastPhysicalInventoryDate', title:scope.resourcesObj.Resources.Item.Properties.LastPhysicalInventoryDate.DisplayText, field:'LastPhysicalInventoryDate', headerAttributes:{'class':'string-field'}, attributes:{'class':'string-field'}, width:150},
						{id:'Variance', title:scope.resourcesObj.Resources.Item.Properties.Variance.DisplayText, field:'Variance', headerAttributes:{'class':'number-field'}, attributes:{'class':'number-field'}, width:100},
						{} //The auto-resize column when the main panel size changes
					];
				}
			}
		};
	});