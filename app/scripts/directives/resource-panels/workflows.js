/**
 * @ngdoc directive
 * @name voyagerUiApp.directive:miWorkflowsPanel
 * @restrict E
 *
 * @description
 * A control panel which saves, updates, and deletes a workflow.
 *
 * @scope
 * @param {string} resourceId An expression evaluating a ResourceID of a workflow.
 * @param {string} parentState An expression evaluating to the name of a state. This state will be navigated to when the resource panel's "cancel" button is hit, or if the resource is deleted.
 */

angular.module('voyagerUiApp').directive('miWorkflowsPanel',
	function(resources, Workflows) {
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
					scope.resourceName = 'workflow';

					//Delegate to child miHttpAlertTrigger function
					scope.miHttpAlertTrigger = angular.noop;


					scope.getNew = function() {
						return Workflows.getNew();
					};
					scope.get = function() {
						return Workflows.get(scope.resourceId);
					};
					scope.delete = function() {
						return Workflows.delete(scope.resourceId);
					};
					scope.save = function(data) {
						return Workflows.save(data);
					};
					scope.update = function(data) {
						return Workflows.update(data);
					};

					scope.headerTemplateUrl = 'views/directives/mi-panels/mi-workflows-panel/header.html';
					scope.tabs = [{
						name: '',
						templateUrl: 'views/directives/mi-panels/mi-workflows-panel/tabs/content.html'
					}];
					scope.footerTemplateUrl = 'views/directives/mi-panels/mi-workflows-panel/footer.html';
				}
			}
		};
	});
