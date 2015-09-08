angular.module('voyagerUiApp').factory('MessagingWindow',
	function($compile, jQuery, $rootScope) {
		'use strict';
		
		var windowElement, windowScope;
		windowScope = $rootScope.$new();
		windowElement = $compile('<mi-messaging-window></mi-messaging-window>')(windowScope);
		windowElement = jQuery(windowElement);
		
		return {
			isOpen: function() {
				return windowScope.isOpen();
			},
			open: function() {
				windowElement.modal({backdrop:'static', keyboard:false});
			},
			close: function() {
				windowElement.modal('hide');
			}
		};
	});

angular.module('voyagerUiApp').directive('miMessagingWindow',
	function(jQuery, $timeout, $templateCache){
		'use strict';
		
    return {
      restrict: 'E',
      replace: true,
      template: $templateCache.get('views/directives/mi-messaging-window.html'),
			link: function(scope, element) {
				var isOpen = false;
				scope.isOpen = function() {
					return isOpen;
				};
				
				jQuery(element).on('hide.bs.modal', function() {
					$timeout(function() {
						isOpen = false;
					});
				});
				jQuery(element).on('show.bs.modal', function() {
					$timeout(function() {
						isOpen = true;
					});
				});
			}
    };
  });