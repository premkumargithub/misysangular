angular.module('voyagerUiApp')
  .factory('validationResources', ['$http', function ($http) {
		'use strict';
		
		var validationResourcesObj;
		
		return {
			get: function() {
				return validationResourcesObj;
			},
			init: function(successCallback, errorCallback) {
				$http.get('/manual_components/validation_resources.json')
					.success(function(data, status, headers, config) {
						validationResourcesObj = data;
						
						successCallback({
							data:data,
							status:status,
							headers:headers,
							config:config
						});
					}).error(function(data, status, headers, config) {
						errorCallback({
							data:data,
							status:status,
							headers:headers,
							config:config
						});
					})
				;
			},
			getPropertyByString: function(strRef) {
				var i, objProperty = this.get(), properties = strRef.split('.');
				
				for(i = 0; i < properties.length; i+=1) {
					if(objProperty.hasOwnProperty(properties[i])) {
						objProperty = objProperty[properties[i]];
					} else {
						objProperty = {};
						break;
					}
				}
				
				return objProperty;
			}
		};
  }]);
