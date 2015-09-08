angular.module('voyagerUiApp')
  .factory('resources', ['$http', function ($http) {
		'use strict';
		
		var resourcesObj;
		
		return {
			get: function() {
				return resourcesObj;
			},
			init: function(langCode, successCallback, errorCallback) {
				$http.get('/manual_components/resources_'+langCode+'.json')
					.success(function(data, status, headers, config) {
						resourcesObj = data;
						
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
