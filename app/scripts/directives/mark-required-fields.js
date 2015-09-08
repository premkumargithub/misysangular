angular.module('voyagerUiApp').directive('markRequiredFields',
	function(jQuery, $timeout) {
		'use strict';
		
		return {
			restrict: 'A',
			link: function(scope, element) {
				var jQueryElement = jQuery(element);
				
				$timeout(function() {
					$timeout(function() {
						jQueryElement.find('.mi-field').each(function() {
							var required, input = jQuery(this).find('input');
							required = !!jQuery(input[0]).attr('required') || jQuery(input[0]).attr('required') === '';
							
							if(required) {
								jQuery(jQuery(this).find('label')[0]).attr('data-after', '*');
							}
						});
					}, 0);
				}, 0);
			}
		};
	});