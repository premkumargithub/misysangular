/**
 * @ngdoc directive
 * @name voyagerUiApp.directive:miAccountPanel
 * @restrict E
 *
 * @description
 * A control panel which saves, updates, and deletes an account.
 *
 * @scope
 * @param {string} mode An expression evaluating to a ViewModes mode.
 * @param {string} resourceId An expression evaluating a ResourceID of an account.
 * @param {string} parentState An expression evaluating to the name of a state. This state will be navigated to when the resource panel's "cancel" button is hit, or if the resource is deleted.
 */

angular.module('voyagerUiApp').directive('miAccountPanel',
	function(Accounts, resources) {
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
					scope.resourceName = 'account';

					//Delegate to child miHttpAlertTrigger function
					scope.miHttpAlertTrigger = angular.noop;

					scope.getNew = function() {
						return Accounts.getNew();
					};
					scope.get = function() {
						return Accounts.get(scope.resourceId);
					};
					scope.delete = function() {
						return Accounts.delete(scope.resourceId);
					};
					scope.save = function(data) {
						return Accounts.save(data);
					};
					scope.update = function(data) {
						return Accounts.update(data);
					};

					scope.headerTemplateUrl = 'views/directives/mi-panels/mi-chart-of-accounts-panel/header.html';
					scope.tabs = [{
						name: '',
						templateUrl: 'views/directives/mi-panels/mi-chart-of-accounts-panel/content.html'
					}];
					scope.footerTemplateUrl = 'views/directives/mi-panels/mi-chart-of-accounts-panel/footer.html';
				}
			}
		};
	});
