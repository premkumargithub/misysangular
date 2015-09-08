angular.module('mi-angular-lib.utilities.validation').directive('validate', function() {
	'use strict';

	return {
		require: 'ngModel',
		link: function(scope, element, attrs, ctrl) {
			var validators = scope[attrs.validate];

			element.tooltip({
				'title': 'tooltip',
				'trigger': 'manual',
				'placement': 'bottom'
			});

			// TODO: remove this if no needed: element.after('<div class="tooltip-wrapperr"><div class="mi-tooltip ng-isolate-scope" text="\'yes\'" show="false" data-original-title="" title=""></div></div>');

			angular.forEach(validators, function(validator, index) {
				ctrl.$validators[validator.id] = function(viewModel, modelValue) {
					var valid = validator.validationFn(viewModel, modelValue);
					if (!valid) {
						showHideToolbar(index, false);
					} else {
						showHideToolbar(index, true);
					}

					return valid;
				};
			});

			function showHideToolbar(index, validState) {
				validators[index].state = validState;
				var unvalidFound = false;

				for (var i = 0; i < validators.length; ++i) {
					if (!validators[i].state) {
						unvalidFound = true;
						element.tooltip()
							.attr('data-original-title', validators[i].message)
							.tooltip('fixTitle');
						element.tooltip('show');
						break;
					}
				}
				if (!unvalidFound && index === validators.length - 1) {
					element.tooltip('hide');
				}
			}
		}
	};
});