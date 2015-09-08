/**
 * @ngdoc directive
 * @name voyagerUiApp.directive:miSelectField
 * @restrict E
 *
 * @description
 * A wrapper of select which generates options for static enumerations. Options which are edited over time are handled with mi-finder-field. Given a reference string for a resource property, it prepends a label and applies validation requirements.
 *
 * @scope
 * @param {string} miFieldProperty A reference to a resource property. For example Resources.Items.Properties.ID will reference the ID of item objects.
 * @param {string} ngModel https://docs.angularjs.org/api/ng/directive/ngModel
 * @param {string=} miReadonly Expression that evaluates to true/false. When true, displays text field. When false, displays value as a string in lieu of an input element. Differs from ngReadonly in that ngReadonly is more traditional. ngReadonly does not "remove" the element, but makes it disabled but with ability to highlight the value.
 * @param {string=} ngDisabled https://docs.angularjs.org/api/ng/directive/ngDisabled
 */

angular.module('voyagerUiApp').directive('miSelectField',
	function() {
		'use strict';

		return {
			templateUrl: 'views/directives/mi-fields/mi-select-field.html',
			restrict: 'E',
			replace: true,
			scope: {
				miFieldProperty: '@',
				miReadonly: '=',
				ngDisabled: '=',
				ngModel: '='
			},
			controller: 'MiFieldCtrl',
			link: function(scope) {
				scope.displayText = scope.getDisplayText(scope.miFieldProperty);
				scope.options = scope.getResourcesProperties(scope.miFieldProperty).Options;

				scope.$watch('ngModel', function() {
					if (typeof scope.ngModel === 'number') {
						scope.ngModel = String(scope.ngModel);
					}
				});

				scope.getReadonlyValue = function() {
					var readonlyValue = '';

					if (angular.isDefined(scope.options)) {
						readonlyValue = scope.options[scope.ngModel];
					}

					return readonlyValue;
				};

				scope.isReadonly = function() {
					return scope.miReadonly;
				};

				scope.isEmpty = function() {
					var empty = true;

					if (angular.isDefined(scope.ngModel)) {
						if (scope.ngModel !== null) {
							if (scope.ngModel.length > 0) {
								empty = false;
							}
						}
					}

					return empty;
				};
			}
		};
	});
