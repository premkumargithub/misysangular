/* 
	 This directive is a nearly direct copy of custom-title.js it solves the
	 problem of title being re-added when the title attribute is data bound.
	 This can be remove if custom-title.js is fixed by Angular's One-time binding 1.3 (stable)
	 
	 More information here:
	 http://stackoverflow.com/questions/18790333/angular-js-render-value-without-data-binding
*/

angular.module('voyagerUiApp').directive('miBoundTitle',
	function (jQuery) {
		'use strict';
		
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
				element = jQuery(element);
				
				element.tooltip({
					animation: true,
					delay: 600,
					placement:'auto',
					title:attrs.miBoundTitle
				});
      }
    };
  });
