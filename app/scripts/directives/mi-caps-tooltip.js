angular.module('voyagerUiApp').directive('miCapsTooltip',
	function (jQuery, resources) {
		'use strict';
		
		//Turn off CAPS lock notifications in IE
		document.msCapsLockWarningOff = true;
		
    return {
      restrict: 'A',
      link: function(scope, element) {
				var target, capsLockOn = function(e){
					var charCode, shiftOn;
					e = e !== null ? e : window.event;
					
					charCode = e.which;
					shiftOn = e.shiftKey;
					
					//Char was lowercase, but shift was on
					if (charCode >= 97 && charCode <= 122 && shiftOn) {
						return true;
					}
					
					//Char was uppercase but shift was off
					if (charCode >= 65 && charCode <= 90 && !shiftOn) {
						return true;
					}
					
					//Char only affected by shift
					return false;
				};
				element = jQuery(element);
				
				//Set tooltip to new sibling element to avoid conflict with mi-tooltip directive
				element.after('<div class="caps-tooltip"></div>');
				target = element.next();
				
				//Initialize tooltip and remove any trigger behavior
				target.tooltip({
					placement:'bottom',
					title:resources.get().Directives.MiCapsTooltip.DisplayText,
					trigger: 'focus'
				});
				target.off('focus');
				
				//Check for caps after each keypress, and remove notification on blur
				element.on('blur', function() {
					target.tooltip('hide');
				});
				element.on('keypress', function(e) {
					if(capsLockOn(e)) {
						target.tooltip('show');
					} else {
						target.tooltip('hide');
					}
				});
      }
    };
  });
