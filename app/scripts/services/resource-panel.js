angular.module('voyagerUiApp').factory('ResourcePanel',
	function() {
		'use strict';
		
		var callbacks = {
			focusOnFirstField: angular.noop
		};
		
		return {
			focusOnFirstField: function() {
				callbacks.focusOnFirstField();
			},
			registerListener: function(action, callback) {
				callbacks[action] = callback;
			}
		};
	});