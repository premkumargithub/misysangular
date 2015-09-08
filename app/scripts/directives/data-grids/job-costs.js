/**
 * @ngdoc directive
 * @name voyagerUiApp.directive:miJobCostsDataGrid
 * @restrict E
 *
 * @description
 * A data grid which lists costs of items used in a job using predefined columns.
 * 
 * @scope
 * @param {string} jobResourceId An expression which evaluates to an existing job ResourceID.
 * @param {string=} editable An expression which evaluates to true or false. UI elements are added which enables creating, updating, and deleting entries.
 * @param {string=} onSelect A method on the scope which is essentially an event listener. The data of the selected record is passed to this method. **Example:** on-select="onAccountSelect(data)"
 *
 */

angular.module('voyagerUiApp').directive('miJobCostsDataGrid',
	function(Jobs, resources) {
		'use strict';
		
		return {
			restrict: 'E',
			replace: true,
			scope: {
				jobResourceId: '=',
				editable: '@',
				onRowSelect: '&'
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
						throw 'Job Costs Data Grid cannot be editable because it has not defined create, update, or destroy requests.';
					}
					scope.read = function(params) {
						return Jobs.getJobDetails(scope.jobResourceId, params);
					};
					scope.onSelect = function(data) {
						scope.onRowSelect({data: data});
					};
					
					scope.columns = [
						{id:'JobItemID', title:scope.resourcesObj.Resources.JobDetails.Properties.JobItemID.DisplayText, field:'JobItemID', headerAttributes:{'class':'string-field'}, attributes:{'class':'string-field'}, width:125},
						//{id:'ItemDescription', title:scope.resourcesObj.Resources.JobDetails.Properties.ItemDescription.DisplayText, field:'ItemDescription', headerAttributes:{'class':'string-field'}, attributes:{'class':'string-field'}, width:250},
						{id:'PartID', title:scope.resourcesObj.Resources.JobDetails.Properties.PartID.DisplayText, field:'PartID', headerAttributes:{'class':'string-field'}, attributes:{'class':'string-field'}, width:125},
						{id:'PartDescription', title:scope.resourcesObj.Resources.JobDetails.Properties.PartDescription.DisplayText, field:'PartDescription', headerAttributes:{'class':'string-field'}, attributes:{'class':'string-field'}, width:125},
						{id:'LocationID', title:scope.resourcesObj.Resources.JobDetails.Properties.LocationID.DisplayText, field:'LocationID', headerAttributes:{'class':'string-field'}, attributes:{'class':'string-field'}, width:125},
						//{id:'LocationDescription', title:scope.resourcesObj.Resources.JobDetails.Properties.LocationDescription.DisplayText, field:'LocationDescription', headerAttributes:{'class':'string-field'}, attributes:{'class':'string-field'}, width:125},
						{id:'Type', title:scope.resourcesObj.Resources.JobDetails.Properties.Type.DisplayText, field:'Type', headerAttributes:{'class':'string-field'}, attributes:{'class':'string-field'}, width:125},
						{id:'StockCost', title:scope.resourcesObj.Resources.JobDetails.Properties.StockCost.DisplayText, field:'StockCost', headerAttributes:{'class':'string-field'}, attributes:{'class':'string-field'}, width:125},
						{id:'WipCost', title:scope.resourcesObj.Resources.JobDetails.Properties.WipCost.DisplayText, field:'WipCost', headerAttributes:{'class':'string-field'}, attributes:{'class':'string-field'}, width:125},
						{id:'ReserveCost', title:scope.resourcesObj.Resources.JobDetails.Properties.ReserveCost.DisplayText, field:'ReserveCost', headerAttributes:{'class':'string-field'}, attributes:{'class':'string-field'}, width:125},
						{id:'OrderCost', title:scope.resourcesObj.Resources.JobDetails.Properties.OrderCost.DisplayText, field:'OrderCost', headerAttributes:{'class':'string-field'}, attributes:{'class':'string-field'}, width:125},
						{id:'UsedCost', title:scope.resourcesObj.Resources.JobDetails.Properties.UsedCost.DisplayText, field:'UsedCost', headerAttributes:{'class':'string-field'}, attributes:{'class':'string-field'}, width:125},
						{id:'ReceivedCost', title:scope.resourcesObj.Resources.JobDetails.Properties.ReceivedCost.DisplayText, field:'ReceivedCost', headerAttributes:{'class':'string-field'}, attributes:{'class':'string-field'}, width:125},
						{}
					];
				}
			}
		};
	});