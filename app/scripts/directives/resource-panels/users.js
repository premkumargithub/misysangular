/**
 * @ngdoc directive
 * @name voyagerUiApp.directive:miUserPanel
 * @restrict E
 *
 * @description
 * A control panel which saves, updates, and deletes a user.
 *
 * @scope
 * @param {string} mode An expression evaluating to a ViewModes mode.
 * @param {string} resourceId An expression evaluating a ResourceID of a user.
 * @param {string} parentState An expression evaluating to the name of a state. This state will be navigated to when the resource panel's "cancel" button is hit, or if the resource is deleted.
 */

angular.module('voyagerUiApp').directive('miUserPanel',
	function(resources, $state, UsersService, ViewModes) {
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
					scope.resourceName = 'user';

					//Delegate to child miHttpAlertTrigger function
					scope.miHttpAlertTrigger = angular.noop;

					//Request promises are placed on the scope by object ID
					scope.additionalRequests = {
						currentUserRequest: function() {
							return UsersService.getSessionUser();
						}
					};

					scope.getNew = function() {
						return UsersService.getNew();
					};
					scope.get = function() {
						return UsersService.get(scope.resourceId);
					};
					scope.delete = function() {
						return UsersService.delete(scope.resourceId);
					};
					scope.save = function(data) {
						return UsersService.save(data);
					};
					scope.update = function(data) {
						return UsersService.update(data);
					};

					scope.currentUserIsAdmin = function() {
						var isAdmin = false;

						if (angular.isDefined(scope.currentUser)) {
							isAdmin = scope.currentUser.isAdmin();
						}

						return isAdmin;
					};

					scope.currentUserIsRootAdmin = function() {
						var isRootAdmin = false;

						if (angular.isDefined(scope.user)) {
							isRootAdmin = scope.currentUser.isRootAdmin();
						} else {
							console.log('Not defined 2');
						}

						return isRootAdmin;
					};


					scope.controls = {
						AskSecurityQuestionOnLogin: {
							disabled: function() {
								return !scope.currentUserIsAdmin();
							}
						},
						LoginConflict: {
							disabled: function() {
								return !scope.currentUserIsAdmin() || scope.user.isRootAdmin();
							}
						},
						logoff: {
							click: function() {
								return scope.user.forceLogoff().catch (function error(response) {
									scope.miHttpAlertTrigger(response.status, response.data);
								});
							},
							show: function() {
								return scope.currentUserIsAdmin();
							}
						},
						Password: {
							required: function() {
								return scope.mode === ViewModes.add;
							}
						},
						ResetPasswordOption: {
							disabled: function() {
								return !scope.currentUserIsAdmin();
							}
						},
						SecurityAnswer: {
							required: function() {
								var required = false;

								if (angular.isDefined(scope.user)) {
									required = scope.user.needsSecurityAnswer();
								}

								return required;
							}
						},
						SecurityQuestion: {
							required: function() {
								var required = false;

								if (angular.isDefined(scope.user)) {
									required = scope.user.needsSecurityQuestion();
								}

								return required;
							}
						},
						resetPasswordBtn: {
							disabled: function() {
								return true;
							},
							click: function() {
								return 1;
							}
						}

					};

					scope.formDisabled = function() {
						return scope.mode === ViewModes.readonly;
					};

					scope.deleteDisabled = function() {
						var disabled = false;

						if (angular.isDefined(scope.user)) {
							if (scope.user.ID === 'ADMIN') {
								disabled = true;
							}
						}

						return disabled;
					};

					//If id and name are not empty or undefined
					scope.seperationShown = function() {
						var idIsValid = false,
							nameIsValid = false;

						if (angular.isDefined(scope.user)) {
							if (angular.isDefined(scope.user.ID)) {
								if (scope.user.ID.length > 0) {
									idIsValid = true;
								}
							}
							if (angular.isDefined(scope.user.Name)) {
								if (scope.user.Name.length > 0) {
									nameIsValid = true;
								}
							}
						}

						return idIsValid && nameIsValid;
					};

					scope.headerTemplateUrl = 'views/directives/mi-panels/mi-user-panel/header.html';
					scope.tabs = [{
						name: '',
						templateUrl: 'views/directives/mi-panels/mi-user-panel/content.html'
					}];
					scope.footerTemplateUrl = 'views/directives/mi-panels/mi-user-panel/footer.html';
				},
				post: function(scope) {
					scope.currentUserRequest.then(function(response) {
						scope.currentUser = response.data;
					});
				}
			}
		};
	});
