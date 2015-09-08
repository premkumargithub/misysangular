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

angular.module('voyagerUiApp').directive('miSupplierPriceBreakDataGrid',
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
							id: 'MinimumQuantityPOUnits',
							title: scope.resourcesObj.Resources.Suppliers.Properties.MinimumQuantityPOUnits.DisplayText,
							field: 'ID',
							headerAttributes: {
								'class': 'string-field'
							},
							attributes: {
								'class': 'string-field'
							},
							width: 300
						},
						{
							id: 'POUnits',
							title: scope.resourcesObj.Resources.Suppliers.Properties.POUnits.DisplayText,
							field: 'Description',
							headerAttributes: {
								'class': 'string-field'
							},
							attributes: {
								'class': 'string-field'
							},
							width: 150
						},
						{
							id: 'Type',
							title: scope.resourcesObj.Resources.Suppliers.Properties.Type.DisplayText,
							//template: Items.trackingToString,
							field: 'Tracking',
							headerAttributes: {
								'class': 'string-field'
							},
							attributes: {
								'class': 'string-field'
							},
							width: 150
						},
						{
							id: 'PricePOUnits',
							title: scope.resourcesObj.Resources.Suppliers.Properties.PricePOUnits.DisplayText,
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
							id: 'Discount',
							title: scope.resourcesObj.Resources.Suppliers.Properties.Discount.DisplayText,
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
							id: 'MinimumQuantity',
							title: scope.resourcesObj.Resources.Suppliers.Properties.MinimumQuantity.DisplayText,
							field: 'ReorderLevel',
							headerAttributes: {
								'class': 'number-field'
							},
							attributes: {
								'class': 'number-field'
							},
							width: 200
						},
						{
							id: 'StockingUnits',
							title: scope.resourcesObj.Resources.Suppliers.Properties.StockingUnits.DisplayText,
							field: 'MaximumLevel',
							headerAttributes: {
								'class': 'number-field'
							},
							attributes: {
								'class': 'number-field'
							},
							width: 200
						},
						{} //The auto-resize column when the main panel size changes
					];

				}
			}
		};
	});
