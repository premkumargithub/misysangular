angular.module('voyagerUiApp').directive('miApplicationModeSlider',
	function(ActiveApplicationMode, ApplicationModes, jQuery) {
		'use strict';
		
		return {
			restrict: 'E',
			replace: true,
			template:'<div class="mi-application-mode-slider">'+
				'<span class="live">Live</span>'+
					'<div class="slider"></div>'+
				'<span class="test">Test</span>'+
			'</div>',
			link: function(scope, element) {
				var updateElementClass = function(newMode) {
					angular.forEach(ApplicationModes.get(), function(mode) {
						if(mode !== ActiveApplicationMode.get()) {
							if(element.hasClass(mode.cssClass)) {
								element.removeClass(mode.cssClass);
							}
						}
					});
					
					element.addClass(newMode.cssClass);
				};
			
				jQuery(element).find('div.slider').slider({
					slide: function(event, ui) {
						updateElementClass(ApplicationModes.getByValue(ui.value));
						ActiveApplicationMode.setByValue(ui.value);
						scope.$apply();
					},
					max:2,
					min:1,
					step:1,
					value: ActiveApplicationMode.get().value
				});
				
				element.addClass('live');
			}
		};
	});
