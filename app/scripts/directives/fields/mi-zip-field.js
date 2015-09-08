/**
 * @ngdoc directive
 * @name voyagerUiApp.directive:miTelField
 * @restrict E
 *
 * @description
 * A wrapper of input[tel] which handles a large spectrum of use cases. Given a reference string for a resource property, it prepends a label and applies validation requirements.
 *
 * Note that ngRequired must be available to this directive in the future. However, ui-mask breaks ngRequired. Expect to repair this feature.
 *
 * @scope
 * @param {string} miFieldProperty A reference to a resource property. For example Resources.Items.Properties.ID will reference the ID of item objects.
 * @param {string} ngModel https://docs.angularjs.org/api/ng/directive/ngModel
 * @param {string=} miReadonly Expression that evaluates to true/false. When true, displays text field. When false, displays value as a string in lieu of an input element. Differs from ngReadonly in that ngReadonly is more traditional. ngReadonly does not "remove" the element, but makes it disabled but with ability to highlight the value.
 * @param {string=} ngDisabled https://docs.angularjs.org/api/ng/directive/ngDisabled
 * @param {string=} ngReadonly https://docs.angularjs.org/api/ng/directive/ngReadonly
 */

angular.module('voyagerUiApp')
	.directive('miZipField', ['Geocoder', function() {
		'use strict';
		return {
			restrict: 'E',
			replace: true,
			templateUrl: 'views/directives/mi-fields/mi-zip-field.html',
			scope: {
				miFieldProperty: '@',
				miReadonly: '=',
				ngDisabled: '=',
				ngModel: '=',
				theCountry: '=',
				ngRequired: '=',
				ngMaxlength: '='
			},
			require: 'ngModel',
			controller: 'MiFieldCtrl',
			link: function(scope, element, attrs, ctrl) {
								
				var input = element.find('input');
				scope.displayText = scope.getDisplayText(scope.miFieldProperty);
				
				scope.isCountryUs = function() {
					return (scope.theCountry === 'United States');
				};
				scope.validRequired = function() {
					
					return input.hasClass('ng-valid-required');
				};

				scope.validZip = function() {
					if (input.hasClass('ng-invalid-required')){
						return true;
					}else{
						return input.hasClass('ng-valid-zip');
					}
				};

				
				scope.isReadonly = function() {
					var readonly = false;

					if (angular.isDefined(attrs.miReadonly)) {
						readonly = scope.miReadonly;
					}

					return readonly;
				};

				scope.isEmpty = function() {
					return ctrl.$isEmpty(scope.ngModel);
				};

			}
		};
	}]);