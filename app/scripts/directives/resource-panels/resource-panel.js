/**
 * @ngdoc directive
 * @name voyagerUiApp.directive:miResourcePanel
 * @restrict E
 *
 * @description
 * A control panel which saves, updates, deletes, and cancels in the same manner for any resource type. Uses a child but not an isolate scope.
 *
 * @scope
 * @param {string} resourceName The property name of the primary resource (e.g. item, account, user...). The resource is placed on the parent scope by this property name.
 * @param {string} mode The property name of a ViewMode value.
 * @param {string} delete The property name of the function which deletes the primary resource and returns a promise. Expects function to have no parameters.
 * @param {string} get The property name of the function which gets the primary resource and returns a promise. Expects function to have no parameters.
 * @param {string} getNew The property name of the function which gets a new primary resource and returns that object. Expects function to have no parameters.
 * @param {string} save The property name of the function which saves a primary resource and returns a promise. Expects function to have one parameter - resource data.
 * @param {string} update The property name of the function which updates a primary resource and returns a promise. Expects function to have one parameter - resource data.
 * @param {string} additionalRequests The property name of an object mapping from names of request promises that will be placed on the scope to their requests.
 *								 Requests must return promises. This object lets miResourcePanel keep track of what is and isn't loaded yet, while giving access to the request to the parent scope.
 * @param {string} headerTemplateUrl The property name of a template url which fills in the top space between next and previous buttons, and the save/cancel/delete buttons.
 * @param {string} tabs The property name of tab objects with a "name" display text property and a relevant "templateUrl" property.
 * @param {string} footerTemplateUrl The property name of a template url which fills in the bottom space between next and previous buttons, and the save/cancel/delete buttons.
 * @param {string} parentState The property name of a state name that the panel returns to if cancelled, or if the resource is deleted.
 */

angular.module('voyagerUiApp').directive('miResourcePanel',
	function(miResourcePanelLinks, $templateCache) {
		'use strict';

		//A way to reliably get inherited values "passed" to the directive without using an isolate scope,
		//and without quietly limiting property names of the parent scope
		return {
			replace: 'true',
			template: $templateCache.get('views/directives/mi-panels/mi-panel.html'),
			restrict: 'E',
			scope: true,
			link: miResourcePanelLinks
		};
	});

//This is an unfortunate work around for testing tightly-bound parent and child directives
angular.module('voyagerUiApp').factory('miResourcePanelLinks',
	function($interval, jQuery, modalWindow, $q, ResourcePanel, resources, $state, $stateParams, $timeout, ViewModes, $rootScope) {
		'use strict';

		return {
			post: angular.noop,
			pre: function(scope, element, attrs) {
				//Just so no one has to type and re-type the array notation
				var getResourceData, getScopeValueForAttr, setResourceData;
				getScopeValueForAttr = function(scope, attrs, propertyName) {
					return scope[[attrs[propertyName]]];
				};
				getResourceData = function() {
					return scope[scope.resourceName];
				};
				setResourceData = function(data) {
					scope.$parent[scope.resourceName] = data;
				};

				ResourcePanel.registerListener('focusOnFirstField', function() {
					$timeout(function() {
						scope.$watch('activePromises', function() {
							if (scope.activePromises === 0) {
								$timeout(function() {
									jQuery(element.find('form header input')[0]).focus().prop('selectionStart', 0).prop('selectionEnd', 0);
								}, 0);
							}
						});
					}, 150);
				});

				ResourcePanel.focusOnFirstField();

				//Replacement for isolate scope
				scope.resourceName = getScopeValueForAttr(scope, attrs, 'resourceName');
				scope.mode = getScopeValueForAttr(scope, attrs, 'mode');
				scope.delete = getScopeValueForAttr(scope, attrs, 'delete');
				scope.get = getScopeValueForAttr(scope, attrs, 'get');
				scope.getNew = getScopeValueForAttr(scope, attrs, 'getNew');
				scope.save = getScopeValueForAttr(scope, attrs, 'save');
				scope.update = getScopeValueForAttr(scope, attrs, 'update');
				scope.additionalRequests = getScopeValueForAttr(scope, attrs, 'additionalRequests');
				scope.headerTemplateUrl = getScopeValueForAttr(scope, attrs, 'headerTemplateUrl');
				scope.tabs = getScopeValueForAttr(scope, attrs, 'tabs');
				scope.footerTemplateUrl = getScopeValueForAttr(scope, attrs, 'footerTemplateUrl');
				scope.parentState = getScopeValueForAttr(scope, attrs, 'parentState');
				scope.parentMiHttpAlertTrigger = getScopeValueForAttr(scope, attrs, 'miHttpAlertTrigger');

				scope.askToSave = true;
				scope.leave = function() {
					scope.askToSave = false;
					$state.go(scope.parentState);
				};

				//Show loading screen until promises are satisfied
				//Thank god for single-threaded apps
				scope.isLoading = false;
				scope.activePromises = 0;
				scope.waitFor = function(promise) {
					if (scope.isLoading === false) {
						scope.isLoading = true;
					}
					scope.activePromises += 1;
					promise.finally(scope.finishWait);
				};

				scope.finishWait = function() {
					scope.activePromises -= 1;
					if (scope.activePromises === 0) {
						scope.isLoading = false;
					}
				};

				//  Wait for the primary resource, and any additional resources
				if (scope.mode === ViewModes.edit || scope.mode === ViewModes.readonly) {
					scope.waitFor(scope.get().then(function(response) {
						setResourceData(response.data);
					}).catch (function() {
						//Assuming 404 situation
						$state.go(scope.parentState);
					}));
				}
				if (scope.mode === ViewModes.add) {
					setResourceData(scope.getNew());
				}
				angular.forEach(scope.additionalRequests, function(request, requestName) {
					var requestPromise = request();
					scope.$parent[requestName] = requestPromise;
					scope.waitFor(requestPromise);
				});

				scope.contentTemplateUrl = scope.tabs[0].templateUrl;

				//Delegates for two miHttpAlerts
				scope.miHttpAlertTriggerUpper = angular.noop;
				scope.miHttpAlertTriggerLower = angular.noop;

				scope.miHttpAlertTrigger = function(status, data) {
					scope.miHttpAlertTriggerUpper(status, data);
					scope.miHttpAlertTriggerLower(status, data);
				};
				scope.parentMiHttpAlertTrigger = scope.miHttpAlertTrigger;
				scope.miHttpAlertSuccessTrigger = function() {
					scope.miHttpAlertTrigger(200, {
						Message: 'Saved Changes.'
					});
				};

				scope.btnSave = function() {
					var newParams, request;
					var currentStateName = $state.current.name;
					if (scope.mode === ViewModes.edit || scope.mode === ViewModes.readonly) {
						request = scope.update(getResourceData());

						request.then(function(response) {

							if (currentStateName !== 'base.home.admin.users.selection') {
								setResourceData(response.data);
							}
							scope.panelForm.$setPristine();
							scope.miHttpAlertSuccessTrigger();
							if (currentStateName === 'base.home.admin.users.selection') {
								$rootScope.isSideMenuActive = !jQuery('.sidebar-wrap').hasClass('hidden-by-slide');
								$state.go($state.current.name, $stateParams, {
									reload: true
								});
							}


						}).catch (function(response) {
							scope.miHttpAlertTrigger(response.status, response.data);
						});
					}
					if (scope.mode === ViewModes.add) {
						request = scope.save(getResourceData());

						request.then(function(response) {
							newParams = angular.copy($stateParams);
							newParams.ResourceID = response.data.ResourceID;
							newParams.mode = 'edit';

							scope.panelForm.$setPristine();
							if (currentStateName === 'base.home.admin.securityProfiles.selection' || currentStateName === 'base.home.admin.users.selection') {
								$rootScope.isSideMenuActive = !jQuery('.sidebar-wrap').hasClass('hidden-by-slide');
							}
							$state.go($state.current.name, newParams, {
								location: 'replace',
								reload: true
							});
						}).catch (function(response) {
							scope.miHttpAlertTrigger(response.status, response.data);
						});
					}

					return request;
				};
				scope.btnCancel = function() {
					scope.leave();
				};
				scope.btnDelete = function() {
					var request;

					if (scope.mode === ViewModes.edit || scope.mode === ViewModes.readonly) {
						request = scope.delete();
						request.then(function() {
							scope.leave();
							$state.go(scope.parentState, $stateParams, {
								reload: true
							});
						});
						request.catch(function(response) {
							scope.miHttpAlertTrigger(response.status, response.data);
						});
					} else {
						scope.leave();
					}

					return request;
				};

				scope.$on('$stateChangeStart', function(event, toState, toParams) {
					var continueStateChange = function() {
						scope.askToSave = false;
						$state.go(toState, toParams);
					};

					//If the new state is not a child of this state
					if (toState.name.indexOf($state.current.name) < 0 || toState.name === $state.current.name) {
						if (!scope.panelForm.$pristine && scope.askToSave) {
							event.preventDefault();

							modalWindow.showMessage(modalWindow.getUpdateMessageFor(getResourceData().ID), {
								'yes': function() {
									if (scope.miPanelMode === 'add') {
										scope.save(getResourceData()).then(function() {
											continueStateChange();
										}).catch (function(response) {
											scope.miHttpAlertTrigger(response.status, response.data);
										});
									} else {
										scope.update(getResourceData()).then(function() {
											continueStateChange();
										}).catch (function(response) {
											scope.miHttpAlertTrigger(response.status, response.data);
										});
									}
								},
								'no': function() {
									continueStateChange();
								},
								'cancel': angular.noop
							});
						}
					}
				});
			}
		};
	});
