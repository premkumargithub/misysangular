/**
 * @ngdoc directive
 * @name voyagerUiApp.directive:miTextField
 * @restrict E
 *
 * @description
 * A wrapper of input[text] which handles a large spectrum of use cases. Given a reference string for a resource property, it prepends a label and applies validation requirements.
 *
 * @scope
 * @param {string} miFieldProperty A reference to a resource property. For example Resources.Items.Properties.ID will reference the ID of item objects.
 * @param {string} ngModel https://docs.angularjs.org/api/ng/directive/ngModel
 * @param {string=} miReadonly Expression that evaluates to true/false. When true, displays text field. When false, displays value as a string in lieu of an input element. Differs from ngReadonly in that ngReadonly is more traditional. ngReadonly does not "remove" the element, but makes it disabled but with ability to highlight the value.
 * @param {string=} ngDisabled https://docs.angularjs.org/api/ng/directive/ngDisabled
 * @param {string=} ngReadonly https://docs.angularjs.org/api/ng/directive/ngReadonly
 * @param {string=} ngRequired *(No link available)* Adds required attribute and required validation constraint to the element when the ngRequired expression evaluates to true. Use ngRequired instead of required when you want to data-bind to the required attribute.
 *
 */

angular.module('voyagerUiApp')
	.directive('miTextField', function($templateCache) {
		'use strict';

		return {
			restrict: 'E',
			replace: true,
			template: $templateCache.get('views/directives/mi-fields/mi-text-field.html'),
			scope: {
				validateEqual: '=',
				miFieldProperty: '@',
				miReadonly: '=',
				ngDisabled: '=',
				ngModel: '=',
				ngReadonly: '=',
				ngRequired: '=',
				ngMaxlength: '@',
				ngMinlength: '@',
				optionalPlaceholder: '@',
				ngPattern: '@'
			},
			controller: 'MiFieldCtrl',
			link: function(scope, element, attrs) {

				var input = element.find('input');
				scope.name = scope.getName(scope.miFieldProperty);
				scope.displayText = scope.getDisplayText(scope.miFieldProperty);
				scope.ngPattern = attrs.ngPattern;

				scope.validRequired = function() {
					return input.hasClass('ng-valid-required');
				};

				scope.validMinlength = function() {
					return input.hasClass('ng-valid-minlength');
				};

				scope.validEqual = function() {
					return input.hasClass('ng-valid-equal') || angular.isUndefined(scope.validateEqual);
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

				if (angular.isUndefined(attrs.ngMinlength)) {
					scope.ngMinlength = -1;
				}

				scope.placeholder = '';
				if (angular.isDefined(attrs.optionalPlaceholder)) {
					scope.placeholder = '(optional)';
				}

				if (scope.miFieldProperty === 'Resources.Login.Properties.Username' || scope.miFieldProperty === 'Resources.SecurityProfiles.Properties.SecurityProfileID' ||
					scope.miFieldProperty === 'Resources.User.Properties.ID' || scope.miFieldProperty ==='Resources.Suppliers.Properties.ID'||
					scope.miFieldProperty === 'Resources.Login.Properties.CompanyName' || scope.miFieldProperty === 'Resources.Departments.Properties.DepartmentID') {
					scope.$watch('ngModel', function() {
						scope.ngModel = angular.uppercase(scope.ngModel);
					});
				}


				//Remove form-control from input if directive has class no-form-control
				if (angular.isDefined(attrs.class)) {
					if (element.hasClass('no-form-control')) {
						element.find('input').removeClass('form-control');
					}
				}
			}
		};
	});
