angular.module('voyagerUiApp').directive('miMaxlength',
	function() {
		'use strict';
		
		return {
			restrict: 'A',
			require: 'ngModel',
			link: function(scope, element, attrs, ngModelController) {
				attrs.$set('ngTrim', 'false');
				ngModelController.$parsers.push(function (value) {
					var maxlength = parseInt(scope[attrs.miMaxlength], 10);
					
					if(maxlength > -1) {
						if (value.length > maxlength) {
							value = value.substr(0, maxlength);
							ngModelController.$setViewValue(value);
							ngModelController.$render();
						}
					}

					return value;
				});
			}
		};
	});