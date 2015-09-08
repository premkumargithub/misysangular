angular.module('mi-angular-lib.utilities.validation').service('MaxlengthValidator',
	function(Validator) {
		'use strict';
		
		function MinlengthValidator(maximumLength) {
			var id = 'maxlength';
			var message = 'Field maximum characters is ' + maximumLength + ' characters.';
			var validationFn = function(viewValue, modelValue) {
				var valid = false;
				
				if(viewValue.length <= maximumLength) {
					valid = true;
				} else {
					modelValue = viewValue.substring(0, maximumLength);
					viewValue = viewValue.substring(0, maximumLength) + 'more';
				}
				
				return valid;
			};
			
			Validator.call(this, id, message, validationFn);
		}
		MinlengthValidator.prototype = Object.create(Validator.prototype);
		MinlengthValidator.prototype.constructor = MinlengthValidator;
		
		return MinlengthValidator;
	});