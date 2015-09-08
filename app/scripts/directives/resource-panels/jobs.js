/**
 * @ngdoc directive
 * @name voyagerUiApp.directive:miJobPanel
 * @restrict E
 *
 * @description
 * A control panel which saves, updates, and deletes a job.
 * 
 * @scope
 * @param {string} mode An expression evaluating to a ViewModes mode.
 * @param {string} resourceId An expression evaluating a ResourceID of a job.
 * @param {string} parentState An expression evaluating to the name of a state. This state will be navigated to when the resource panel's "cancel" button is hit, or if the resource is deleted.
 */

angular.module('voyagerUiApp').directive('miJobPanel',
	function(Jobs, resources) {
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
					scope.resourceName = 'job';
					
					//Delegate to child miHttpAlertTrigger function
					scope.miHttpAlertTrigger = angular.noop;
					
					//Request promises are placed on the scope by object ID
					scope.additionalRequests = {
						jobDetailsRequest: function() {
							return Jobs.getJobDetails(scope.resourceId);
						}
					};
					
					scope.getNew = function() {
						return Jobs.getNew();
					};
					scope.get = function() {
						return Jobs.get(scope.resourceId);
					};
					scope.delete = function() {
						return Jobs.delete(scope.resourceId);
					};
					scope.save = function(data) {
						return Jobs.save(data);
					};
					scope.update = function(data) {
						return Jobs.update(data);
					};
					
					scope.headerTemplateUrl = 'views/directives/mi-panels/mi-job-panel/header.html';
					scope.tabs = [
						{name:scope.resourcesObj.Views.Home.MasterFiles.Submenus.MasterFiles.Jobs.Tabs.Header.DisplayText, templateUrl: 'views/directives/mi-panels/mi-job-panel/tabs/header.html'},
						{name:scope.resourcesObj.Views.Home.MasterFiles.Submenus.MasterFiles.Jobs.Tabs.Quantities.DisplayText, templateUrl: 'views/directives/mi-panels/mi-job-panel/tabs/quantities.html'},
						{name:scope.resourcesObj.Views.Home.MasterFiles.Submenus.MasterFiles.Jobs.Tabs.Costs.DisplayText, templateUrl: 'views/directives/mi-panels/mi-job-panel/tabs/costs.html'},
						{name:scope.resourcesObj.Views.Home.MasterFiles.Submenus.MasterFiles.Jobs.Tabs.History.DisplayText, templateUrl: 'views/directives/mi-panels/mi-job-panel/tabs/history.html'}
					];
					scope.footerTemplateUrl = 'views/directives/mi-panels/mi-job-panel/footer.html';
				},
				post: function(scope) {
					scope.jobDetailsRequest.then(function(response) {
						scope.jobDetails = response.data;
					});
				}
			}
		};
	});