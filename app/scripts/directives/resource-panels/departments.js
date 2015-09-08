/**
 * @ngdoc directive
 * @name voyagerUiApp.directive:miDepartmentPanel
 * @restrict E
 *
 * @description
 * A control panel which saves, updates, and deletes a user.
 *
 * @scope
 * @param {string} resourceId An expression evaluating a ResourceID of a user.
 * @param {string} parentState An expression evaluating to the name of a state. This state will be navigated to when the resource panel's "cancel" button is hit, or if the resource is deleted.
 */

angular.module('voyagerUiApp').directive('miDepartmentPanel',
	function(resources, Departments) {
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
					scope.resourceName = 'department';

					//Delegate to child miHttpAlertTrigger function
					scope.miHttpAlertTrigger = angular.noop;


					scope.getNew = function() {
						return Departments.getNew();
					};
					scope.get = function() {
						return Departments.get(scope.resourceId);
					};
					scope.delete = function() {
						return Departments.delete(scope.resourceId);
					};
					scope.save = function(data) {
						return Departments.save(data);
					};
					scope.update = function(data) {
						return Departments.update(data);
					};

					scope.headerTemplateUrl = 'views/directives/mi-panels/mi-departments-panel/header.html';
					scope.tabs = [{
						name: 'asd',
						templateUrl: 'views/directives/mi-panels/mi-departments-panel/tabs/content.html'
					}];
					scope.footerTemplateUrl = 'views/directives/mi-panels/mi-departments-panel/footer.html';
				}
			}
		};
	});
