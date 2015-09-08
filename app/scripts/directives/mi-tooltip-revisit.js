angular.module('voyagerUiApp').directive('miTooltipRevisit',
	function (jQuery) {
		'use strict';
		
    return {
      restrict: 'E',
			replace:true,
			scope: {
				placement: '@',
				show: '=',
				text: '='
			},
			template: '<div class="mi-tooltip"></div>',
      link: function(scope, element, attrs) {
				element = jQuery(element);
				
				if(angular.isUndefined(attrs.placement)) {
					scope.placement = 'bottom';
				}
				
				element.tooltip({
					placement:scope.placement,
					trigger:'manual',
					title:scope.text
				});
				
				scope.$watch('show', function() {
					if(scope.show) {
						element.tooltip('show');
					} else {
						element.tooltip('hide');
					}
				});
      }
    };
  });
