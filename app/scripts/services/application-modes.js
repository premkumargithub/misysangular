angular.module('voyagerUiApp').factory('ApplicationModes',
	function() {
		'use strict';
		
		/*
			Each application mode has a CSS class. This is really the only way to reliably
			data-bind to this object, in a getter sense, while also not relying on the DisplayText
			string while writing CSS rules. Don't forget, the DisplayText may be any
			spoken language.
		*/
		
		return {
			get: function() {
				return {
					Trial: {
						cssClass: 'trial',
						DisplayText: 'Trial',
						value: 0
					},
					Live: {
						cssClass: 'live',
						DisplayText: 'Live',
						value: 1
					},
					Test: {
						cssClass: 'test',
						DisplayText: 'Test',
						value: 2
					}
				};
			},
			getByValue: function(value) {
				var mode = null;
				
				angular.forEach(this.get(), function(applicationMode) {
					if(applicationMode.value === value) {
						mode = applicationMode;
					}
				});
				
				return mode;
			}
		};
	});