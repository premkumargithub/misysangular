var mod = angular.module('mockHelpResources', []);
mod.service('helpResources', function() {
	return {
		init: function(successCallback) {
			successCallback({data: ''});
		},
		getHelpUrl: function(strRef) {
			return '';
		}
	};
});