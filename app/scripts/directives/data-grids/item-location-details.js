/**
 * @ngdoc directive
 * @name voyagerUiApp.directive:miItemLocationDetailsDataGrid
 * @restrict E
 *
 * @description
 * A data grid which lists all locations of a company where an item is stored.
 *
 * @scope
 * @param {string} itemResourceId An expression which evaluates to an existing item ResourceID.
 * @param {string=} editable An expression which evaluates to true or false. UI elements are added which enables creating, updating, and deleting entries.
 * @param {string=} onSelect A method on the scope which is essentially an event listener. The data of the selected record is passed to this method. **Example:** on-select="onAccountSelect(data)"
 *
 */

angular.module('voyagerUiApp').directive('miItemLocationDetailsDataGrid',
	function($compile, ItemLocationDetails, resources, $rootScope) {
		'use strict';
		
		return {
			restrict: 'E',
			replace: true,
			scope: {
				itemResourceId: '=',
				editable: '@',
				onRowSelect: '&onSelect'
			},
			templateUrl: 'views/directives/mi-data-grid.html',
			link: {
				pre: function(scope, element, attrs) {
					scope.resourcesObj = resources.get();
					scope.refreshEvent = ItemLocationDetails.onChangeEvent;
					
					if(angular.isDefined(attrs.contractable)) {
						scope.contractable = true;
					} else {
						scope.contractable = false;
					}
		
					scope.destroy = function(data) {
						return ItemLocationDetails.delete(scope.itemResourceId, data.ResourceID);
					};
					scope.read = function(params) {
						return ItemLocationDetails.query(scope.itemResourceId, params);
					};
					scope.create = function(data) {
						var temp = angular.copy(data);
						
						//Removing blank ResourceID prevents a 400 error from the server
						//Obviously this is a problem of the server, should be fixed
						delete temp.ResourceID;
						return ItemLocationDetails.save(scope.itemResourceId, temp);
					};
					scope.update = function(data) {
						return ItemLocationDetails.update(scope.itemResourceId, data);
					};
					scope.onSelect = function(data) {
						scope.onRowSelect({data: data});
					};
					
					
					//Object made to satisfy both DataSource schema.model and KendoGrid columns configs
					//With some time spent with this, and it may be better of as 2 different objects
					scope.properties = [{
						id:'LocationID',
						modelConfig: {
							editable: true,
							type: 'string',
							validation: {
								required: true
							}
						},
						columnConfig: {
							editor: function(container, options) {
								var locationIDField, newScope;
								newScope = $rootScope.$new();
								
								newScope.LocationID = options.model.LocationID;
								locationIDField = $compile(
									'<mi-finder-field '+
										'class="no-label" '+
										'mi-field-property="ItemLocation.Properties.LocationID" '+
										'grid-tag="mi-locations-data-grid" '+
										'ng-model="LocationID" '+
										'ng-required="true" '+
									'></mi-finder-field>'
								)(newScope);
								
								//Kendo's binding is temperamental.
								//Binds on standard text input, but doesn't bind after angular ngModel binding.
								newScope.$watch('LocationID', function() {
									options.model.LocationID = newScope.LocationID;
									options.model.dirty = true;
								});
								container.append(locationIDField);
							},
							field:'LocationID',
							title:scope.resourcesObj.Resources.ItemLocation.Properties.LocationID.DisplayText,
							headerAttributes:{'class':'string-field'},
							attributes:{'class':'string-field'},
							width:150
						}
					}, {
						id:'PreferredLocation',
						modelConfig: {
							editable: 'true',
							type: 'boolean'
						},
						columnConfig: {
							title:scope.resourcesObj.Resources.ItemLocation.Properties.PreferredLocation.DisplayText,
							field:'PreferredLocation',
							headerAttributes:{'class':'string-field'},
							attributes:{'class':'string-field'},
							width:100
						}
					}, {
						id:'Pick',
						modelConfig: {
							editable: true,
							type: 'string',
							validation: {
								required: true
							}
						},
						columnConfig: {
							title:scope.resourcesObj.Resources.ItemLocation.Properties.Pick.DisplayText,
							field:'Pick',
							headerAttributes:{'class':'string-field'},
							attributes:{'class':'string-field'},
							width:125
						}
					}, {
						id:'StockQuantity',
						modelConfig: {
							editable: false,
							type: 'number'
						},
						columnConfig: {
							title:scope.resourcesObj.Resources.ItemLocation.Properties.StockQuantity.DisplayText,
							field:'StockQuantity',
							headerAttributes:{'class':'string-field'},
							attributes:{'class':'string-field'},
							width:100
						}
					}, {
						id:'WipQuantity',
						modelConfig: {
							editable: false,
							type: 'number'
						},
						columnConfig: {
							title:scope.resourcesObj.Resources.ItemLocation.Properties.WipQuantity.DisplayText,
							field:'WipQuantity',
							headerAttributes:{'class':'string-field'},
							attributes:{'class':'string-field'},
							width:100
						}
					}, {
						id:'ReserveQuantity',
						modelConfig: {
							editable: false,
							type: 'number'
						},
						columnConfig: {
							title:scope.resourcesObj.Resources.ItemLocation.Properties.ReserveQuantity.DisplayText,
							field:'ReserveQuantity',
							headerAttributes:{'class':'string-field'},
							attributes:{'class':'string-field'},
							width:100
						}
					}, {
						id:'OrderQuantity',
						modelConfig: {
							editable: false,
							type: 'number'
						},
						columnConfig: {
							title:scope.resourcesObj.Resources.ItemLocation.Properties.OrderQuantity.DisplayText,
							field:'OrderQuantity',
							headerAttributes:{'class':'string-field'},
							attributes:{'class':'string-field'},
							width:100
						}
					}, {
						id:'MaximumLevel',
						modelConfig: {
							defaultValue: 1000,
							editable: true,
							type: 'number',
							validation: {
								required: true,
								min: 1
							}
						},
						columnConfig: {
							title:scope.resourcesObj.Resources.ItemLocation.Properties.MaximumLevel.DisplayText,
							field:'MaximumLevel',
							headerAttributes:{'class':'string-field'},
							attributes:{'class':'string-field'},
							width:150
						}
					}, {
						id:'ReorderLevel',
						modelConfig: {
							defaultValue: 500,
							editable: true,
							type: 'number',
							validation: {
								required: true,
								min: 1
							}
						},
						columnConfig: {
							title:scope.resourcesObj.Resources.ItemLocation.Properties.ReorderLevel.DisplayText,
							field:'ReorderLevel',
							headerAttributes:{'class':'string-field'},
							attributes:{'class':'string-field'},
							width:150
						}
					}, {
						id:'MinimumLevel',
						modelConfig: {
							defaultValue: 0,
							editable: true,
							type: 'number',
							validation: {
								required: true,
								min: 0
							}
						},
						columnConfig: {
							title:scope.resourcesObj.Resources.ItemLocation.Properties.MinimumLevel.DisplayText,
							field:'MinimumLevel',
							headerAttributes:{'class':'string-field'},
							attributes:{'class':'string-field'},
							width:150
						}
					}, {
						id:'ReorderQuantity',
						modelConfig: {
							defaultValue: 500,
							editable: true,
							type: 'number',
							validation: {
								required: true,
								min: 1
							}
						},
						columnConfig: {
							title:scope.resourcesObj.Resources.ItemLocation.Properties.ReorderQuantity.DisplayText,
							field:'ReorderQuantity',
							headerAttributes:{'class':'string-field'},
							attributes:{'class':'string-field'},
							width:150
						}
					}, {
						id:'Variance',
						modelConfig: {
							editable: false,
							type: 'number'
						},
						columnConfig: {
							title:scope.resourcesObj.Resources.ItemLocation.Properties.Variance.DisplayText,
							field:'Variance',
							headerAttributes:{'class':'string-field'},
							attributes:{'class':'string-field'},
							width:100
						}
					}, {
						id:'LastPhysicalInventoryDate',
						modelConfig: {
							defaultValue: null,
							editable: false,
							type: 'string'
						},
						columnConfig: {
							title:scope.resourcesObj.Resources.ItemLocation.Properties.LastPhysicalInventoryDate.DisplayText,
							field:'LastPhysicalInventoryDate',
							headerAttributes:{'class':'string-field'},
							attributes:{'class':'string-field'},
							width:175
						}
					}, {
						id:'LastUsedDate',
						modelConfig: {
							defaultValue: null,
							editable: false,
							type: 'string'
						},
						columnConfig: {
							title:scope.resourcesObj.Resources.ItemLocation.Properties.LastUsedDate.DisplayText,
							field:'LastUsedDate',
							headerAttributes:{'class':'string-field'},
							attributes:{'class':'string-field'},
							width:175
						}
					},{
						id: 'FieldXml',
						modelConfig: {
							type: 'string'
						}
					}, {
						id: 'InitialOrderQuantity',
						modelConfig: {
							type: 'number'
						}
					}, {
						id: 'InitialReserveQuantity',
						modelConfig: {
							type: 'number'
						}
					}, {
						id: 'InitialStockQuantity',
						modelConfig: {
							type: 'number'
						}
					}, {
						id: 'InitialWipQuantity',
						modelConfig: {
							type: 'number'
						}
					}, {
						id: 'ItemID',
						modelConfig: {
							type: 'string'
						}
					}, {
						id: 'ResourceID',
						modelConfig: {
							type: 'string'
						}
					}];
				}
			}
		};
	});