angular.module('voyagerUiApp').directive('validateEmail',
	function() {
		'use strict';
		
		var EMAIL_REGEXP = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		return {
			restrict: 'A',
			require: 'ngModel',
			link: function(scope, element, attrs, ngModelController) {
				ngModelController.$validators.email = function(modelValue, viewValue) {
					var isValid = false;
					
					if (ngModelController.$isEmpty(modelValue)) {
						isValid = true;
					} else {
						if (EMAIL_REGEXP.test(viewValue)) {
							return true;
						}
					}
					
					return isValid;
				};
			}
		};
	});