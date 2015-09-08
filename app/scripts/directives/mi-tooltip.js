angular.module('voyagerUiApp').directive('miTooltip',
	function (jQuery) {
		'use strict';
		
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
				element = jQuery(element);
			
				element.tooltip({
					html:true,
					placement:'top',
					trigger:'focus',
					title:attrs.miTooltip
				});
      }
    };
  });
