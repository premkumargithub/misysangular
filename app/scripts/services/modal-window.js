angular.module('voyagerUiApp').factory('modalWindow',
	function ($compile, jQuery, $q, resources, $rootScope) {
		'use strict';
		
		var	windowScope, windowElement;
		
		windowScope	= $rootScope.$new();
		windowScope.closed = true;
		
		windowScope.openWindow = function() {
			windowElement.modal({backdrop:'static', keyboard:false});
			windowScope.closed = false;
		};
		windowScope.closeWindow = function() {
			windowElement.modal('hide');
			windowScope.closed = true;
		};
		
		windowElement = $compile('<mi-modal-window></mi-modal-window>')(windowScope);
		windowElement = jQuery(windowElement);
		
		return {
			waitFor: function(promise) {
				windowScope.addPromise(promise);
			},
			showMessage: function(message, buttons) {
				windowScope.addMessage(message, buttons);
			},
			getUpdateMessageFor: function(identifier) {
				var message = '';
				if(angular.isDefined(identifier)) {
					message = resources.get().Directives.ModalWindow.SaveMessage.DisplayText+identifier+'?';
				} else {
					message = resources.get().Directives.ModalWindow.SaveMessageGeneric.DisplayText+'?';
				}
				return message;
			}
		};
  });

angular.module('voyagerUiApp').directive('miModalWindow',
	function(){
		'use strict';
		
    return {
      restrict: 'E',
      replace: true,
      template:'<div class="modal fade" ng-class="{\'loading-screen\':messages.length === 0}" tabindex="-1" role="dialog" aria-labelledby="Modal Window" aria-hidden="true">'+
				'<div class="modal-dialog">'+
					'<div class="modal-content">'+
						'<div class="modal-header">'+
							'<button type="button" class="close" ng-click="close(0)" aria-hidden="true">&times;</button>'+
							'<h4 class="modal-title" id="myModalLabel">{{resourcesObj.Services.ModalWindow.DefaultHeading.DisplayText}}</h4>'+
						'</div>'+
						'<div class="modal-body">'+
							'{{activeMessage}}'+
						'</div>'+
						'<div class="modal-footer">'+
							'<button ng-repeat="btn in activeBtns" type="button" class="btn {{btn.displayClass}}" ng-click="respond(btn.onClickCallback)">{{btn.DisplayText}}</button>'+
						'</div>'+
						'<div ng-show="messages.length === 0" class="loading-image"/></div>'+
					'</div>'+
				'</div>'+
			'</div>',
			controller:'ModalWindowCtrl'
    };
  });