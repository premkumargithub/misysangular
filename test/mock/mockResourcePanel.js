var mod = angular.module('mockResourcePanel', []);
mod.service('miResourcePanelLinks', function() {
	return {
		post: angular.noop,
		pre: function(scope, element, attrs) {
			angular.forEach(scope[attrs.additionalRequests], function(request, requestName) {
				scope.$parent[requestName] = request();
			});
		}
	};
});