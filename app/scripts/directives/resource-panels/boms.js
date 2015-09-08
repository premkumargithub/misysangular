/**
 * @ngdoc directive
 * @name voyagerUiApp.directive:miBomPanel
 * @restrict E
 *
 * @description
 * A control panel which saves, updates, and deletes a bom.
 * 
 * @scope
 * @param {string} mode An expression evaluating to a ViewModes mode.
 * @param {string} resourceId An expression evaluating a ResourceID of a bom.
 * @param {string} parentState An expression evaluating to the name of a state. This state will be navigated to when the resource panel's "cancel" button is hit, or if the resource is deleted.
 */

angular.module('voyagerUiApp').directive('miBomPanel',
	function(resources, Boms) {
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
					scope.resourceName = 'bom';
					
					//Delegate to child miHttpAlertTrigger function
					scope.miHttpAlertTrigger = angular.noop;
					
					scope.getNew = function() {
						return Boms.getNew();
					};
					scope.get = function() {
						return Boms.get(scope.resourceId);
					};
					scope.delete = function() {
						return Boms.delete(scope.resourceId);
					};
					scope.save = function(data) {
						return Boms.save(data);
					};
					scope.update = function(data) {
						return Boms.update(data);
					};
			
					scope.headerTemplateUrl = 'views/directives/mi-panels/mi-bom-panel/header.html';
					scope.tabs = [
						{name:scope.resourcesObj.Views.Home.MasterFiles.Submenus.MasterFiles.Boms.Tabs.Header.DisplayText, templateUrl: 'views/directives/mi-panels/mi-bom-panel/tabs/header.html'},
						{name:scope.resourcesObj.Views.Home.MasterFiles.Submenus.MasterFiles.Boms.Tabs.Revision.DisplayText, templateUrl: 'views/directives/mi-panels/mi-bom-panel/tabs/revision.html'},
						{name:scope.resourcesObj.Views.Home.MasterFiles.Submenus.MasterFiles.Boms.Tabs.Material.DisplayText, templateUrl: 'views/directives/mi-panels/mi-bom-panel/tabs/material.html'}
					];
					scope.footerTemplateUrl = 'views/directives/mi-panels/mi-bom-panel/footer.html';
				}
			}
		};
	});
	