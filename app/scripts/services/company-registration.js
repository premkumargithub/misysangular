angular.module('voyagerUiApp').factory('CompanyRegistration',
	function(apiRoot, CallbackWrapper) {
		'use strict';
		
		return {
			activate: function(activationCode) {
				var httpWrapper, request;
				
				httpWrapper = CallbackWrapper.getHttpWrapper();
				request = httpWrapper({
					url:apiRoot+'/activate/'+activationCode,
					method: 'POST',
				});
				
				return request;
			},
			register: function(data) {
				var httpWrapper, request;
				
				httpWrapper = CallbackWrapper.getHttpWrapper();
				request = httpWrapper({
					url:apiRoot+'/register',
					method: 'POST',
					data: data
				});
				
				return request;
			}
		};
	});