angular.module('voyagerUiApp').factory('Login',
	function (apiRoot, CallbackWrapper, Session) {
	'use strict';

	return {
		getSecurityQuestion : function (AuthCode) {
			var httpWrapper,
			request;

			httpWrapper = CallbackWrapper.getHttpWrapper();
			request = httpWrapper({
					url : apiRoot + '/reset-password/security-question/:AuthCode',
					method : 'GET',
					params : {
						AuthCode : AuthCode
					}
				});

			return request;
		},
		mailAuthCode : function (data) {
			var httpWrapper,
			request;

			httpWrapper = CallbackWrapper.getHttpWrapper();
			request = httpWrapper({
					url : apiRoot + '/reset-password/authorization',
					method : 'POST',
					data : data
				});

			request.then(function () {
				Session.stop();
			});

			return request;
		},
		resetPassword : function (data) {
			var httpWrapper,
			request;

			httpWrapper = CallbackWrapper.getHttpWrapper();
			request = httpWrapper({
					url : apiRoot + '/reset-password',
					method : 'PATCH',
					data : data
				});

			return request;
		},
		verifyAuthCode : function (AuthCode, data) {
			var httpWrapper,
			request;

			httpWrapper = CallbackWrapper.getHttpWrapper();
			request = httpWrapper({
					url : apiRoot + '/reset-password/authorization/:AuthCode',
					method : 'GET',
					params : {
						AuthCode : AuthCode
					},
					data : data
				});

			return request;
		},
		verifySecurityAnswer : function (data) {
			var httpWrapper,
			request;

			httpWrapper = CallbackWrapper.getHttpWrapper();
			request = httpWrapper({
					url : apiRoot + '/reset-password/security-question',
					method : 'POST',
					data : data
				});

			return request;
		}
	};
});
