angular.module('voyagerUiApp').directive('showWhenScrolling',
	function(jQuery) {
		'use strict';
		
		return {
			restrict: 'A',
			link: {
				pre: function(scope, element) {
					element.css('display', 'none');
				},
				post: function(scope, element, attrs) {
					jQuery(window).scroll(function() {
						if (jQuery(window).scrollTop() > attrs.showWhenScrolling) {
							element.fadeIn(400);
						} else {
							element.fadeOut(400);
						}
					});
				}
			}
		};
	});