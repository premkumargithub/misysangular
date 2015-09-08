/**
 * @ngdoc directive
 * @name voyagerUiApp.directive:miSupplierPanel
 * @restrict E
 *
 * @description
 * A control panel which saves, updates, and deletes a supplier.
 *
 * @scope
 * @param {string} mode An expression evaluating to a ViewModes mode.
 * @param {string} resourceId An expression evaluating a ResourceID of a supplier.
 * @param {string} parentState An expression evaluating to the name of a state. This state will be navigated to when the resource panel's "cancel" button is hit, or if the resource is deleted.
 */

angular.module('voyagerUiApp').directive('miSupplierPanel',
	function(resources, $state, Suppliers) {
		'use strict';

		return {
			replace: 'true',
			templateUrl: 'views/directives/mi-panels/generic-panel.html',
			restrict: 'E',
			scope: {
				mode: '=',
				resourceId: '=',
				parentState: '='
			},
			link: {
				pre: function(scope) {
					scope.resourcesObj = resources.get();
					scope.resourceName = 'supplier';

                    scope.swapPermSecAddress = function(){
                        var supplierObject = scope[scope.resourceName];
                        supplierObject.PrimaryEmail = [supplierObject.SecondaryEmail, supplierObject.SecondaryEmail = supplierObject.PrimaryEmail][0];
                        supplierObject.PrimaryFirstName = [supplierObject.SecondaryFirstName, supplierObject.SecondaryFirstName = supplierObject.PrimaryFirstName][0];
                        supplierObject.PrimaryLastName = [supplierObject.SecondaryLastName, supplierObject.SecondaryLastName = supplierObject.PrimaryLastName][0];
                        supplierObject.PrimaryTelephone = [supplierObject.SecondaryTelephone, supplierObject.SecondaryTelephone = supplierObject.PrimaryTelephone][0];
                        supplierObject.PrimarySalutation = [supplierObject.SecondarySalutation, supplierObject.SecondarySalutation = supplierObject.PrimarySalutation][0];
                        supplierObject.PrimaryMobile = [supplierObject.SecondaryMobile, supplierObject.SecondaryMobile = supplierObject.PrimaryMobile][0];

                        return null;
                    };

					//Delegate to child miHttpAlertTrigger function
					scope.miHttpAlertTrigger = angular.noop;

					scope.getNew = function() {
						return Suppliers.getNew();
					};
					scope.get = function() {
						return Suppliers.get(scope.resourceId);
					};
					scope.delete = function() {
						return Suppliers.delete(scope.resourceId);
					};
					scope.save = function(data) {
						return Suppliers.save(data);
					};
					scope.update = function(data) {
						return Suppliers.update(data);
					};

					scope.files = [];

					scope.onLoaded = function() {
						console.log('Google Picker loaded!');
					};

					scope.onPicked = function(data) {
						angular.forEach(data, function(file) {
							scope.files.push(file.url);
						});
						scope.googleDriveFiles = scope.files.toString();
					};

					scope.onCancel = function() {
						console.log('Google picker close/cancel!');
					};

					scope.headerTemplateUrl = 'views/directives/mi-panels/mi-supplier-panel/header.html';
					scope.tabs = [
						{
							name: scope.resourcesObj.Views.Home.MasterFiles.Submenus.MasterFiles.Suppliers.Tabs.Master.DisplayText,
							templateUrl: 'views/directives/mi-panels/mi-supplier-panel/tabs/master.html'
						},
						{
							name: scope.resourcesObj.Views.Home.MasterFiles.Submenus.MasterFiles.Suppliers.Tabs.Notes.DisplayText,
							templateUrl: 'views/directives/mi-panels/mi-supplier-panel/tabs/notes.html'
						},
						{
							name: scope.resourcesObj.Views.Home.MasterFiles.Submenus.MasterFiles.Suppliers.Tabs.Items.DisplayText,
							templateUrl: 'views/directives/mi-panels/mi-supplier-panel/tabs/items.html'
						},
                        {
                            name: scope.resourcesObj.Views.Home.MasterFiles.Submenus.MasterFiles.Suppliers.Tabs.History.DisplayText,
                            templateUrl: 'views/directives/mi-panels/mi-supplier-panel/tabs/history.html'
                        },
						{
							//							name: scope.resourcesObj.Views.Home.MasterFiles.Submenus.MasterFiles.Suppliers.Tabs.PriceBreak.DisplayText,
							//							templateUrl: 'views/directives/mi-panels/mi-supplier-panel/tabs/price-break.html'
							//						}, {
							name: scope.resourcesObj.Views.Home.MasterFiles.Submenus.MasterFiles.Suppliers.Tabs.PurchaseOrders.DisplayText,
							templateUrl: 'views/directives/mi-panels/mi-supplier-panel/tabs/purchase_order.html'
						}
					];
					scope.footerTemplateUrl = 'views/directives/mi-panels/mi-supplier-panel/footer.html';
				}
			}
		};
	});
