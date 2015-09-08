/**
 * @ngdoc directive
 * @name voyagerUiApp.directive:miLocationPanel
 * @restrict E
 *
 * @description
 * A control panel which saves, updates, and deletes a location.
 * 
 * @scope
 * @param {string} mode An expression evaluating to a ViewModes mode.
 * @param {string} resourceId An expression evaluating a ResourceID of a location.
 * @param {string} parentState An expression evaluating to the name of a state. This state will be navigated to when the resource panel's "cancel" button is hit, or if the resource is deleted.
 */

angular.module('voyagerUiApp').directive('miLocationPanel',
	function(resources, Locations) {
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
					scope.resourceName = 'location';
					
					//Delegate to child miHttpAlertTrigger function
					scope.miHttpAlertTrigger = angular.noop;
				
					scope.getNew = function() {
						return Locations.getNew();
					};
					scope.get = function() {
						return Locations.get(scope.resourceId);
					};
					scope.delete = function() {
						return Locations.delete(scope.resourceId);
					};
					scope.save = function(data) {
						return Locations.save(data);
					};
					scope.update = function(data) {
						return Locations.update(data);
					};
					
					scope.headerTemplateUrl = 'views/directives/mi-panels/mi-location-panel/header.html';
					scope.tabs = [
						{name:scope.resourcesObj.Views.Home.MasterFiles.Submenus.MasterFiles.Locations.Tabs.Address.DisplayText, templateUrl: 'views/directives/mi-panels/mi-location-panel/tabs/address.html'},
						{name:scope.resourcesObj.Views.Home.MasterFiles.Submenus.MasterFiles.Locations.Tabs.Items.DisplayText, templateUrl: 'views/directives/mi-panels/mi-location-panel/tabs/items.html'},
						{name:scope.resourcesObj.Views.Home.MasterFiles.Submenus.MasterFiles.Locations.Tabs.Alternates.DisplayText, templateUrl: 'views/directives/mi-panels/mi-location-panel/tabs/alternates.html'}
					];
					scope.footerTemplateUrl = 'views/directives/mi-panels/mi-location-panel/footer.html';
				}
			}
		};
	});