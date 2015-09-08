angular.module('voyagerUiApp').directive('scrollToElement',
	function(jQuery) {
		'use strict';
		
		return {
			restrict: 'A',
			link: function(scope, element, attrs) {
				var scrollDistance, target;
				target = jQuery(attrs.scrollToElement);
				
				element.on('click', function() {
					if(angular.isDefined(attrs.scrollToBottom)) {
						scrollDistance = target.offset().top + target.outerHeight(true) - jQuery(window).height();
					} else {
						scrollDistance = target.offset().top;
					}
				
					scope.$apply(function() {
						jQuery('html, body').animate({
							scrollTop: scrollDistance
						}, 800);
					});
				});
			}
		};
	});