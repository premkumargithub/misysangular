angular.module('voyagerUiApp').factory('ActiveApplicationMode',
	function(ApplicationModes) {
		'use strict';
		
		var activeMode = ApplicationModes.get().Live;
		
		return {
			get: function() {
				return activeMode;
			},
			set: function(newMode) {
				activeMode = newMode;
			},
			setByValue: function(value) {
				var mode = null;
				
				angular.forEach(ApplicationModes.get(), function(applicationMode) {
					if(applicationMode.value === value) {
						mode = applicationMode;
					}
				});
				
				this.set(mode);
			}
		};
	});