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

angular.module('voyagerUiApp').directive('miSupplierItemsDataGrid',
	function(Suppliers, resources) {
		'use strict';

		return {
			restrict: 'E',
			replace: true,
			scope: {
				supplierResourceId: '=',
				editable: '@',
				supplierItem: '@',
				onRowSelect: '&onSelect'
			},
			templateUrl: 'views/directives/mi-data-grid.html',
			link: {
				pre: function(scope, element, attrs) {
					scope.resourcesObj = resources.get();
					scope.refreshEvent = Suppliers.onChangeEvent;

					if (angular.isDefined(attrs.contractable)) {
						scope.contractable = true;
					} else {
						scope.contractable = false;
					}

					if (scope.editable === 'true') {
						throw 'Supplier Items Data Grid cannot be editable because it has not defined create, update, or destroy requests.';
					}
					scope.read = function(params) {
						return Suppliers.getSupplierItems(scope.locationResourceId, params);
					};
					scope.onSelect = function(data) {
						scope.onRowSelect({
							data: data
						});
					};
					scope.columns = [
						{
							id: 'ID',
							title: scope.resourcesObj.Resources.Suppliers.Properties.ItemId.DisplayText,
							field: 'ID',
							headerAttributes: {
								'class': 'string-field'
							},
							attributes: {
								'class': 'string-field'
							},
							width: 100
						},
						{
							id: 'Description',
							title: scope.resourcesObj.Resources.Suppliers.Properties.Description.DisplayText,
							field: 'Description',
							headerAttributes: {
								'class': 'string-field'
							},
							attributes: {
								'class': 'string-field'
							},
							width: 200
						},
						{
							id: 'SupplierProductCode',
							title: scope.resourcesObj.Resources.Suppliers.Properties.SupplierProductCode.DisplayText,
							//	template: Items.trackingToString,
							field: 'Tracking',
							headerAttributes: {
								'class': 'string-field'
							},
							attributes: {
								'class': 'string-field'
							},
							width: 200
						},
						{
							id: 'LastOrderDate',
							title: scope.resourcesObj.Resources.Suppliers.Properties.LastOrderDate.DisplayText,
							field: 'Pick',
							headerAttributes: {
								'class': 'string-field'
							},
							attributes: {
								'class': 'date-field'
							},
							width: 150
						},
						{
							id: 'RecentCost',
							title: scope.resourcesObj.Resources.Suppliers.Properties.RecentCost.DisplayText,
							field: 'MinimumLevel',
							headerAttributes: {
								'class': 'number-field'
							},
							attributes: {
								'class': 'number-field'
							},
							width: 150
						},
						{
							id: 'YTDQuantity',
							title: scope.resourcesObj.Resources.Suppliers.Properties.YTDQuantity.DisplayText,
							field: 'ReorderLevel',
							headerAttributes: {
								'class': 'number-field'
							},
							attributes: {
								'class': 'number-field'
							},
							width: 150
						},
						{
							id: 'PurchaseUnits',
							title: scope.resourcesObj.Resources.Suppliers.Properties.PurchaseUnits.DisplayText,
							field: 'MaximumLevel',
							headerAttributes: {
								'class': 'number-field'
							},
							attributes: {
								'class': 'number-field'
							},
							width: 150
						},
						{
							id: 'UnitsConversion',
							title: scope.resourcesObj.Resources.Suppliers.Properties.UnitsConversion.DisplayText,
							field: 'ReorderQuantity',
							headerAttributes: {
								'class': 'number-field'
							},
							attributes: {
								'class': 'number-field'
							},
							width: 150
						},
						{
							id: 'OrderLeadDays',
							title: scope.resourcesObj.Resources.Suppliers.Properties.OrderLeadDays.DisplayText,
							field: 'StockQuantity',
							headerAttributes: {
								'class': 'number-field'
							},
							attributes: {
								'class': 'number-field'
							},
							width: 150
						},
						{
							id: 'BasePrice',
							title: scope.resourcesObj.Resources.Suppliers.Properties.BasePrice.DisplayText,
							field: 'WipQuantity',
							headerAttributes: {
								'class': 'number-field'
							},
							attributes: {
								'class': 'number-field'
							},
							width: 150
						},
						{} //The auto-resize column when the main panel size changes
					];

				}
			}
		};
	});
