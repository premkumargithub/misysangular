angular.module('voyagerUiApp').factory('FullScreenResourcePanel',
	function(jQuery) {
		'use strict';
		
		return {
			open: function() {
				jQuery('.home .primary').addClass('full-screen-control-panel');
			},
			close: function() {
				jQuery('.home .primary').removeClass('full-screen-control-panel');
			}
		};
	});