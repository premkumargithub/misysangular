angular.module('voyagerUiApp').factory('ViewModes',
	function() {
		'use strict';
		
		return {
			readonly: 0,
			edit: 1,
			add: 2
		};
	});