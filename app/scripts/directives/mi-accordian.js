angular.module('voyagerUiApp').directive('miAccordian',
	function(jQuery) {
		'use strict';
		
		return {
			replace: 'true',
			restrict: 'E',
			template: '<div class="mi-accordian" ng-transclude></div>',
			transclude: 'true',
			link: {
				post: function(scope, element) {
					var accordianHeaders = element.find('h1'), toggleContent, expandContent, contractContent;
					
					toggleContent = function(header, duration) {
						if(jQuery(header).hasClass('contracted')) {
							expandContent(header, duration);
						} else {
							contractContent(header, duration);
						}
					};
					contractContent = function(header, duration) {
						if(duration === null) {
							duration = 500;
						}
						
						jQuery(header).removeClass('expanded');
						jQuery(header).addClass('contracted');
						jQuery(header).next().slideUp(duration);
					};
					expandContent = function(header, duration) {
						if(duration === null) {
							duration = 500;
						}
						
						jQuery(header).addClass('expanded');
						jQuery(header).removeClass('contracted');
						jQuery(header).next().slideDown(duration);
					};
					
					accordianHeaders.addClass('mi-accordian-header expanded');
					expandContent(accordianHeaders[0], 0);
					accordianHeaders.slice(1, accordianHeaders.length).each(function() {
						contractContent(this, 0);
					});
					
					accordianHeaders.on('click', function() {
						var clickedHeader = this;
						toggleContent(clickedHeader);
						angular.forEach(accordianHeaders, function(header) {
							if(!jQuery(header).is(clickedHeader)) {
								contractContent(header);
							}
						});
					});
				}
			}
		};
	});