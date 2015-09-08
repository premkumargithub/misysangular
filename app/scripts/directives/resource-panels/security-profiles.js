/**
 * @ngdoc directive
 * @name voyagerUiApp.directive:miSecurityProfilePanel
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

angular.module('voyagerUiApp').directive('miSecurityProfilePanel',
	function(resources, SecurityProfiles) {
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
					scope.resourceName = 'securityProfile';

					//Delegate to child miHttpAlertTrigger function
					scope.miHttpAlertTrigger = angular.noop;

					scope.mockCheckbox = true;

					scope.getNew = function() {
						return SecurityProfiles.getNew();
					};
					scope.get = function() {
						return SecurityProfiles.get(scope.resourceId);
					};
					scope.delete = function() {
						return SecurityProfiles.delete(scope.resourceId);
					};
					scope.save = function(data) {
						return SecurityProfiles.save(data);
					};
					scope.update = function(data) {
						return SecurityProfiles.update(data);
					};

					scope.headerTemplateUrl = 'views/directives/mi-panels/mi-security-profiles-panel/header.html';
					scope.tabs = [
						{name: '', templateUrl: 'views/directives/mi-panels/mi-security-profiles-panel/tabs/content.html'}
					];
					scope.footerTemplateUrl = 'views/directives/mi-panels/mi-security-profiles-panel/footer.html';
				}
			}
		};
	});
