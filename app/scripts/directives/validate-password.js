angular.module('voyagerUiApp').directive('validatePassword',
	function(UsersService) {
		'use strict';

		return {
			restrict: 'A',
			require: 'ngModel',
			link: function(scope, element, attrs, ngModelController) {

				if (Boolean(scope[attrs.validatePassword])) {
					ngModelController.$validators.password = function(modelValue, viewValue) {
						var isValid = false;

						if (ngModelController.$isEmpty(modelValue)) {
							isValid = true;
						} else {
							if (UsersService.passwordIsValid(viewValue)) {
								return true;
							}
						}
						ngModelController.$modelValue = viewValue;
						return isValid;
					};
				}

			}
		};
	});
