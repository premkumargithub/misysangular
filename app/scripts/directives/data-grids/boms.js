/**
 * @ngdoc directive
 * @name voyagerUiApp.directive:miBomsDataGrid
 * @restrict E
 *
 * @description
 * A data grid which lists all boms of the company using predefined columns.
 * 
 * @scope
 * @param {string=} editable An expression which evaluates to true or false. UI elements are added which enables creating, updating, and deleting entries.
 * @param {string=} onSelect A method on the scope which is essentially an event listener. The data of the selected record is passed to this method. **Example:** on-select="onAccountSelect(data)"
 *
 */

angular.module('voyagerUiApp').directive('miBomsDataGrid',
	function(Boms, resources) {
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
					scope.refreshEvent = Boms.onChangeEvent;
					
					if(angular.isDefined(attrs.contractable)) {
						scope.contractable = true;
					} else {
						scope.contractable = false;
					}
					
					if(scope.editable === 'true') {
						throw 'Boms Data Grid cannot be editable because it has not defined create, update, or destroy requests.';
					}
					scope.destroy = function(data) {
						return Boms.delete(data.ResourceID);
					};
					scope.read = function(params) {
						return Boms.query(params);
					};
					scope.onSelect = function(data) {
						scope.onRowSelect({data: data});
					};
					
					scope.columns = [
						{id:'ItemID', title:scope.resourcesObj.Resources.Item.Properties.ID.DisplayText, field:'ItemID', headerAttributes:{'class':''}, attributes:{'class':''}, width:100},
						{id:'Description', title:scope.resourcesObj.Resources.Bom.Properties.Description.DisplayText, field:'Description', headerAttributes:{'class':''}, attributes:{'class':''}, width:125},
						{id:'Revision', title:scope.resourcesObj.Resources.Bom.Properties.Revision.DisplayText, field:'Revision', headerAttributes:{'class':''}, attributes:{'class':''}, width:125},
						{id:'RevisionComment', title:scope.resourcesObj.Resources.Bom.Properties.RevisionComment.DisplayText, field:'RevisionComment', headerAttributes:{'class':''}, attributes:{'class':''}, width:150},
						{id:'Author', title:scope.resourcesObj.Resources.Bom.Properties.Author.DisplayText, field:'Author', headerAttributes:{'class':''}, attributes:{'class':''}, width:150},
						{id:'LastMaintainedDate', title:scope.resourcesObj.Resources.Bom.Properties.LastMaintainedDate.DisplayText, field:'LastMaintainedDate', headerAttributes:{'class':''}, attributes:{'class':''}, width:150},
						{id:'Eco', title:scope.resourcesObj.Resources.Bom.Properties.Eco.DisplayText, field:'Eco', headerAttributes:{'class':''}, attributes:{'class':''}, width:125},
						{id:'RevisionDate', title:scope.resourcesObj.Resources.Bom.Properties.RevisionDate.DisplayText, field:'RevisionDate', headerAttributes:{'class':''}, attributes:{'class':''}, width:150},
						{id:'EffectiveStartDate', title:scope.resourcesObj.Resources.Bom.Properties.EffectiveStartDate.DisplayText, field:'EffectiveStartDate', headerAttributes:{'class':''}, attributes:{'class':''}, width:150},
						{id:'EffectiveEndDate', title:scope.resourcesObj.Resources.Bom.Properties.EffectiveEndDate.DisplayText, field:'EffectiveEndDate', headerAttributes:{'class':''}, attributes:{'class':''}, width:150},
						{id:'AllowEffectiveDateOverride', title:scope.resourcesObj.Resources.Bom.Properties.AllowEffectiveDateOverride.DisplayText, field:'AllowEffectiveDateOverride', headerAttributes:{'class':''}, attributes:{'class':''}, width:225},
						{id:'DocumentPath', title:scope.resourcesObj.Resources.Bom.Properties.DocumentPath.DisplayText, field:'DocumentPath', headerAttributes:{'class':''}, attributes:{'class':''}, width:150},
						{}
					];
				}
			}
		};
	});