/**
 * @ngdoc directive
 * @name voyagerUiApp.directive:miEmailField
 * @restrict E
 *
 * @description
 * A wrapper of input[email] which handles a large spectrum of use cases. Given a reference string for a resource property, it prepends a label and applies validation requirements. Handles email validation implicitly.
 *
 * @scope
 * @param {string} miFieldProperty A reference to a resource property. For example Resources.Items.Properties.ID will reference the ID of item objects.
 * @param {string} ngModel https://docs.angularjs.org/api/ng/directive/ngModel
 * @param {string=} miReadonly Expression that evaluates to true/false. When true, displays text field. When false, displays value as a string in lieu of an input element. Differs from ngReadonly in that ngReadonly is more traditional. ngReadonly does not "remove" the element, but makes it disabled but with ability to highlight the value.
 * @param {string=} ngDisabled https://docs.angularjs.org/api/ng/directive/ngDisabled
 * @param {string=} ngReadonly https://docs.angularjs.org/api/ng/directive/ngReadonly
 * @param {string=} ngRequired *(No link available)* Adds required attribute and required validation constraint to the element when the ngRequired expression evaluates to true. Use ngRequired instead of required when you want to data-bind to the required attribute.
 */

angular.module('voyagerUiApp').directive('miEmailField',
	function() {
		'use strict';

		return {
			restrict: 'E',
			replace: true,
			templateUrl: 'views/directives/mi-fields/mi-email-field.html',
			scope: {
				miFieldProperty: '@',
				miReadonly: '=',
				ngDisabled: '=',
				ngModel: '=',
				ngRequired: '=',
				ngMaxlength: '='
			},
			controller: 'MiFieldCtrl',
			link: function(scope, element, attrs) {
				var input = element.find('input');
				scope.displayText = scope.getDisplayText(scope.miFieldProperty);

				scope.validRequired = function() {
					return input.hasClass('ng-valid-required');
				};

				scope.validEmail = function() {
					return input.hasClass('ng-valid-email');
				};

				scope.isReadonly = function() {
					var readonly = false;

					if (angular.isDefined(attrs.miReadonly)) {
						readonly = scope.miReadonly;
					}

					return readonly;
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

				if (angular.isUndefined(attrs.ngMaxlength)) {
					scope.ngMaxlength = -1;
				}
			}
		};
	});
