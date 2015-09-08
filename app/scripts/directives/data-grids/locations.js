/**
 * @ngdoc directive
 * @name voyagerUiApp.directive:miLocationsDataGrid
 * @restrict E
 *
 * @description
 * A data grid which lists all locations of the company using predefined columns.
 * 
 * @scope
 * @param {string=} editable An expression which evaluates to true or false. UI elements are added which enables creating, updating, and deleting entries.
 * @param {string=} onSelect A method on the scope which is essentially an event listener. The data of the selected record is passed to this method. **Example:** on-select="onAccountSelect(data)"
 *
 */

angular.module('voyagerUiApp').directive('miLocationsDataGrid',
	function(Locations, resources) {
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
					scope.refreshEvent = Locations.onChangeEvent;
					
					if(angular.isDefined(attrs.contractable)) {
						scope.contractable = true;
					} else {
						scope.contractable = false;
					}
					
					if(scope.editable === 'true') {
						throw 'Locations Data Grid cannot be editable because it has not defined create, update, or destroy requests.';
					}
					scope.destroy = function(data) {
						return Locations.delete(data.ResourceID);
					};
					scope.read = function(params) {
						return Locations.query(params);
					};
					scope.onSelect = function(data) {
						scope.onRowSelect({data: data});
					};
					
					scope.columns = [
						{id:'ID', field:'ID', title: scope.resourcesObj.Resources.Location.Properties.ID.DisplayText, headerAttributes:{'class':'string-field'}, attributes:{'class':'string-field'}, width:125},
						{id:'Name', field:'Name', title: scope.resourcesObj.Resources.Location.Properties.Name.DisplayText, headerAttributes:{'class':'string-field'}, attributes:{'class':'string-field'}, width:200},
						{id:'Status', field:'Status', title: scope.resourcesObj.Resources.Location.Properties.Status.DisplayText, template:Locations.statusToString, headerAttributes:{'class':'string-field'}, attributes:{'class':'string-field'}, width:125},
						{id:'Address1', field:'Address1', title: scope.resourcesObj.Resources.Location.Properties.Address1.DisplayText, headerAttributes:{'class':'string-field'}, attributes:{'class':'string-field'}, width:125},
						{id:'Address2', field:'Address2', title: scope.resourcesObj.Resources.Location.Properties.Address2.DisplayText, headerAttributes:{'class':'string-field'}, attributes:{'class':'string-field'}, width:125},
						{id:'Address3', field:'Address3', title: scope.resourcesObj.Resources.Location.Properties.Address3.DisplayText, headerAttributes:{'class':'string-field'}, attributes:{'class':'string-field'}, width:125},
						{id:'Address4', field:'Address4', title: scope.resourcesObj.Resources.Location.Properties.Address4.DisplayText, headerAttributes:{'class':'string-field'}, attributes:{'class':'string-field'}, width:125},
						{id:'City', field:'City', title: scope.resourcesObj.Resources.Location.Properties.City.DisplayText,headerAttributes:{'class':'string-field'}, attributes:{'class':'string-field'}, width:125},
						{id:'State', field:'State', title: scope.resourcesObj.Resources.Location.Properties.State.DisplayText, headerAttributes:{'class':'string-field'}, attributes:{'class':'string-field'}, width:125},
						{id:'Zip', field:'Zip', title: scope.resourcesObj.Resources.Location.Properties.Zip.DisplayText, headerAttributes:{'class':'string-field'}, attributes:{'class':'string-field'}, width:125},
						{id:'Country', field:'Country', title: scope.resourcesObj.Resources.Location.Properties.Country.DisplayText, headerAttributes:{'class':'string-field'}, attributes:{'class':'string-field'}, width:125},
						{id:'Phone', field:'Phone', title: scope.resourcesObj.Resources.Location.Properties.Phone.DisplayText, headerAttributes:{'class':'string-field'}, attributes:{'class':'string-field'}, width:125},
						{id:'Fax', field:'Fax', title: scope.resourcesObj.Resources.Location.Properties.Fax.DisplayText, headerAttributes:{'class':'string-field'}, attributes:{'class':'string-field'}, width:125},
						{} //The auto-resize column when the main panel size changes
					];
				}
			}
		};
	});