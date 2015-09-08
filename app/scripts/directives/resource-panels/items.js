/**
 * @ngdoc directive
 * @name voyagerUiApp.directive:miItemPanel
 * @restrict E
 *
 * @description
 * A control panel which saves, updates, and deletes an item.
 * 
 * @scope
 * @param {string} mode An expression evaluating to a ViewModes mode.
 * @param {string} resourceId An expression evaluating a ResourceID of an item.
 * @param {string} parentState An expression evaluating to the name of a state. This state will be navigated to when the resource panel's "cancel" button is hit, or if the resource is deleted.
 */

angular.module('voyagerUiApp').directive('miItemPanel',
	function(Items, resources) {
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
					scope.resourceName = 'item';
					
					//Delegate to child miHttpAlertTrigger function
					scope.miHttpAlertTrigger = angular.noop;
				
					//Request promises are placed on the scope by object ID
					scope.additionalRequests = {
						valuationsRequest: function() {
							return Items.getValuations(scope.resourceId);
						}
					};
				
					scope.getNew = function() {
						return Items.getNew();
					};
					scope.get = function() {
						return Items.get(scope.resourceId);
					};
					scope.delete = function() {
						return Items.delete(scope.resourceId);
					};
					scope.save = function(data) {
						return Items.save(data);
					};
					scope.update = function(data) {
						return Items.update(data);
					};
					
					scope.headerTemplateUrl = 'views/directives/mi-panels/mi-item-panel/header.html';
					scope.tabs = [
						{name:scope.resourcesObj.Views.Home.MasterFiles.Submenus.MasterFiles.Items.Tabs.Master.DisplayText, templateUrl: 'views/directives/mi-panels/mi-item-panel/tabs/master.html'},
						{name:scope.resourcesObj.Views.Home.MasterFiles.Submenus.MasterFiles.Items.Tabs.Stock.DisplayText, templateUrl: 'views/directives/mi-panels/mi-item-panel/tabs/stock.html'},
						{name:scope.resourcesObj.Views.Home.MasterFiles.Submenus.MasterFiles.Items.Tabs.Costs.DisplayText, templateUrl: 'views/directives/mi-panels/mi-item-panel/tabs/costs.html'},
						{name:scope.resourcesObj.Views.Home.MasterFiles.Submenus.MasterFiles.Items.Tabs.History.DisplayText, templateUrl: 'views/directives/mi-panels/mi-item-panel/tabs/history.html'}
					];
					scope.footerTemplateUrl = 'views/directives/mi-panels/mi-item-panel/footer.html';
					
					//Expected objects
					//Valuations table would be better as a directive
					scope.valuations = [];
				},
				post: function(scope) {
					scope.valuationsRequest.then(function(response) {
						scope.valuations = response.data;
					});
				}
			}
		};
	});
