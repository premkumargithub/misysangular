/**
 * @ngdoc directive
 * @name voyagerUiApp.directive:miAccountsDataGrid
 * @restrict E
 *
 * @description
 * A data grid which lists all accounts of the company using predefined columns.
 * 
 * @scope
 * @param {string=} editable An expression which evaluates to true or false. UI elements are added which enables creating, updating, and deleting entries.
 * @param {string=} onSelect A method on the scope which is essentially an event listener. The data of the selected record is passed to this method. **Example:** on-select="onAccountSelect(data)"
 *
 */

angular.module('voyagerUiApp').directive('miAccountsDataGrid',
	function(Accounts, resources) {
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
					scope.refreshEvent = Accounts.onChangeEvent;
					
					if(angular.isDefined(attrs.contractable)) {
						scope.contractable = true;
					} else {
						scope.contractable = false;
					}
					
					//These two functions belong in the Accounts factory
					//Turn Type integer into its associated display text
					scope.transformType = function(account) {
						return scope.resourcesObj.Resources.Account.Properties.Type.Options[account.Type];
					};
					//Turn Status integer into its associated display text
					scope.transformStatus = function(account) {
						return scope.resourcesObj.Resources.Account.Properties.Status.Options[account.Status];
					};
					
					if(scope.editable === 'true') {
						throw 'Accounts Data Grid cannot be editable because it has not defined create, update, or destroy requests.';
					}
					scope.destroy = function(data) {
						return Accounts.delete(data.ResourceID);
					};
					scope.read = function(params) {
						return Accounts.query(params);
					};
					scope.onSelect = function(data) {
						scope.onRowSelect({data: data});
					};
					
					scope.columns = [
						{id:'ID', title:scope.resourcesObj.Resources.Account.Properties.ID.DisplayText, field:'AccountSetID', headerAttributes:{'class':'string-field'}, attributes:{'class':'string-field'}},
						{id:'Name', title:scope.resourcesObj.Resources.Account.Properties.Name.DisplayText, field:'AccountSetName', headerAttributes:{'class':'string-field'}, attributes:{'class':'string-field'}}
					];
				}
			}
		};
	});