angular.module('voyagerUiApp').directive('miButton',
	function ($interval, jQuery) {
		'use strict';

		return {
			template: '<button class="mi-button" ng-click="ngClick()" ng-disabled="isDisabled()">'+
				'<span class="text" ng-class="{\'mi-button-hidden\': isLoading()}" mi-bound-title="{{miButtonText}}">{{miButtonText}}</span>'+
				'<span class="text-loading mi-button-hidden" ng-class="{\'mi-button-hidden\': !isLoading()}">'+
					'{{miButtonLoadingText}}'+
					'<span class="dot mi-hidden">.</span>'+
					'<span class="dot mi-hidden">.</span>'+
					'<span class="dot mi-hidden">.</span>'+
				'</span>'+
			'</button>',
			restrict: 'E',
			replace: true,
			scope: {
				miButtonClick: '&',
				miButtonDisabled: '=',
				miButtonText: '@',
				miButtonLoadingText: '@'
			},
			link: function(scope, element) {
				var ellipsisInterval;
				scope.loading = false;
				
				//Dictates the text visible in the button (miButtonText vs. miButtonLoadingText)
				scope.isLoading = function() {
					return scope.loading;
				};
				
				//Dictates whether the button is enabled
				scope.isDisabled = function() {
					return scope.miButtonDisabled || scope.loading;
				};
			
				//Wraps miButtonClick and watches the promise it returns to dictate ng-disabled
				scope.ngClick = function() {
					var miButtonClickPromise;
					scope.loading = true;
					
					miButtonClickPromise = scope.miButtonClick();
					if(miButtonClickPromise !== null && angular.isDefined(miButtonClickPromise.finally)) {
						miButtonClickPromise.finally(function complete() {
							scope.loading = false;
						});
					} else {
                        scope.loading = false;
						console.log('miButtonClick does not have promise!');
					}
				};
				
				//Animate ellipsis - animations in CSS3 can replace this, but SCSS gave syntax errors on keyframes declaration
				(function() {
					var maxDots, count;
					maxDots = jQuery('span.dot', element).length;
					count = 0;
					
					ellipsisInterval = $interval(function(){
						count+=1;
						if(count % (maxDots+1) === 0) {
							jQuery('span.dot', element).addClass('mi-hidden');
						}
						jQuery('span.dot', element).slice(0, count%(maxDots+1)).removeClass('mi-hidden');
					}, 600);
				}());
				
				scope.$on('$destroy', function() {
					$interval.cancel(ellipsisInterval);
				});
			}
		};
	});
