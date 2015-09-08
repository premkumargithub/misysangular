angular.module('voyagerUiApp').directive('validateEqual',
	function() {
		'use strict';

		return {
			restrict: 'A',
			require: 'ngModel',
			link: function(scope, element, attrs, ngModelController) {
				if(angular.isDefined(scope[attrs.validateEqual])) {
					ngModelController.$validators.equal = function(modelValue, viewValue) {
						var isValid = false;

						if (ngModelController.$isEmpty(modelValue)) {
							isValid = true;
						} else {
							if (scope[attrs.validateEqual].localeCompare(viewValue) === 0) {
								return true;
							}
						}
						
						return isValid;
					};
				}
			}
		};
	});