angular.module('voyagerUiApp').directive('title',
	function(jQuery) {
		'use strict';
	
		return {
			restrict: 'A',
			link: function(scope, element, attrs) {
				var title, titlePlacement;
				title = attrs.title;
				element.removeAttr('title');
				
				if(angular.isDefined(attrs.titlePlacement)) {
					titlePlacement = attrs.titlePlacement;
				} else {
					titlePlacement = 'auto';
				}
				
				jQuery(element).tooltip({
					animation: true,
					delay: 600,
					placement:titlePlacement,
					title: title
				});
			}
		};
	});