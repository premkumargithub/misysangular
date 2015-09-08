/**
 * @ngdoc directive
 * @name voyagerUiApp.directive:miSuppliersDataGrid
 * @restrict E
 *
 * @description
 * A data grid which lists all suppliers of the company using predefined columns.
 * 
 * @scope
 * @param {string=} editable An expression which evaluates to true or false. UI elements are added which enables creating, updating, and deleting entries.
 * @param {string=} onSelect A method on the scope which is essentially an event listener. The data of the selected record is passed to this method. **Example:** on-select="onAccountSelect(data)"
 *
 */

angular.module('voyagerUiApp').directive('miSuppliersDataGrid',
	function(Suppliers, resources) {
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
					scope.refreshEvent = Suppliers.onChangeEvent;
					
					if(angular.isDefined(attrs.contractable)) {
						scope.contractable = true;
					} else {
						scope.contractable = false;
					}
					
					if(scope.editable === 'true') {
						throw 'Suppliers Data Grid cannot be editable because it has not defined create, update, or destroy requests.';
					}
					scope.destroy = function(data) {
						return Suppliers.delete(data.ResourceID);
					};
					scope.read = function(params) {
						return Suppliers.query(params);
					};
					scope.onSelect = function(data) {
						scope.onRowSelect({data: data});
					};
					
					scope.columns = [
						{id:'ID', title:scope.resourcesObj.Resources.Suppliers.Properties.ID.DisplayText, field:'ID', headerAttributes:{'class':'string-field'}, attributes:{'class':'string-field'}, width:125},
						{id:'Name', title:scope.resourcesObj.Resources.Suppliers.Properties.Name.DisplayText, field:'Name', headerAttributes:{'class':'string-field'}, attributes:{'class':'string-field'}, width:225},
						{id:'Status', title:scope.resourcesObj.Resources.Suppliers.Properties.Status.DisplayText, field:'Status', template:Suppliers.statusToString, headerAttributes:{'class':'string-field'}, attributes:{'class':'string-field'}, width:100},
						{id:'Phone', title:scope.resourcesObj.Resources.Suppliers.Properties.Phone.DisplayText, field:'Phone', headerAttributes:{'class':'string-field'}, attributes:{'class':'string-field'}, width:150},
						{id:'Fax',  title:scope.resourcesObj.Resources.Suppliers.Properties.Fax.DisplayText, field:'Fax', headerAttributes:{'class':'string-field'}, attributes:{'class':'string-field'}, width:160},
						{id:'Contact', title:scope.resourcesObj.Resources.Suppliers.Properties.Contact.DisplayText, field:'Contact', headerAttributes:{'class':'string-field'}, attributes:{'class':'string-field'}, width:175},
						{id:'CurrencyID', title:scope.resourcesObj.Resources.Suppliers.Properties.CurrencyID.DisplayText, field:'CurrencyID', headerAttributes:{'class':'string-field'}, attributes:{'class':'string-field'}, width:100},
						{} //The auto-resize column when the main panel size changes
					];
				}
			}
		};
	});