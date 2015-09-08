/**
 * @ngdoc directive
 * @name voyagerUiApp.directive:miSecurityGroupPanel
 * @restrict E
 *
 * @description
 * A control panel which saves, updates, and deletes a security group.
 * 
 * @scope
 * @param {string} mode An expression evaluating to a ViewModes mode.
 * @param {string} resourceId An expression evaluating a ResourceID of a security group.
 * @param {string} parentState An expression evaluating to the name of a state. This state will be navigated to when the resource panel's "cancel" button is hit, or if the resource is deleted.
 */

angular.module('voyagerUiApp').directive('miSecurityGroupPanel',
	function(resources, SecurityGroups) {
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
					scope.resourceName = 'securityGroup';
					
					//Delegate to child miHttpAlertTrigger function
					scope.miHttpAlertTrigger = angular.noop;
					
					scope.mockCheckbox = true;
					
					scope.getNew = function() {
						return SecurityGroups.getNew();
					};
					scope.get = function() {
						return SecurityGroups.get(scope.resourceId);
					};
					scope.delete = function() {
						return SecurityGroups.delete(scope.resourceId);
					};
					scope.save = function(data) {
						return SecurityGroups.save(data);
					};
					scope.update = function(data) {
						return SecurityGroups.update(data);
					};
					
					scope.headerTemplateUrl = 'views/directives/mi-panels/mi-security-groups-panel/header.html';
					scope.tabs = [
						{name:scope.resourcesObj.Views.Home.Admin.Submenus.Admin.SecurityGroups.Tabs.Permissions.DisplayText, templateUrl: 'views/directives/mi-panels/mi-security-groups-panel/tabs/permissions.html'}
					];
					scope.footerTemplateUrl = 'views/directives/mi-panels/mi-security-groups-panel/footer.html';
				}
			}
		};
	});
