angular.module('voyagerUiApp').factory('defaultHttpInterceptors',
	function(apiRoot, HttpWaitTime, $injector, $q, $timeout) {
		'use strict';
		
		var defaultWaitTime, getRemainingWaitTime, redirectOnAuthError;
		defaultWaitTime = Number(HttpWaitTime);	//Cast to accommodate protractor's browser.addMockModule
		
		//Remaining wait time is the difference between the defaultWaitTime and the time it's taken so far
		//Remaining wait time 0 for any non-api call
		getRemainingWaitTime = function(response) {
			var millisSinceRequest, minWaitTime, remainingWaitTime = 0;
			minWaitTime = defaultWaitTime;
			
			if(response.config.url.indexOf(apiRoot) !== 0) {
				minWaitTime = 0;
			}
			
			millisSinceRequest = (new Date().getTime() - response.config.requestTime);
			if(millisSinceRequest > minWaitTime) {
				remainingWaitTime = 0;
			} else {
				remainingWaitTime = minWaitTime - millisSinceRequest;
			}
			
			return remainingWaitTime;
		};
		
		redirectOnAuthError = function(response) {
			var deferment = {};
			
			if(response.status === 401 && angular.isDefined(response.config.headers.Authorization) && response.config.url !== apiRoot+'/logoff') {
				deferment.promise = $injector.get('Session').stop();
				deferment.promise.then(function() {
					$injector.get('$state').go('base.login-template.default');
				});
			} else {
				deferment = $q.defer();
				deferment.reject();
			}
			
			return deferment.promise;
		};
		
		return {
			request: function(config) {
				var deferment = $q.defer();
				
				//Place time request was made onto this request
				config.requestTime = new Date().getTime();
				
				deferment.resolve(config);
				return deferment.promise;
			},
			response: function(response) {
				var timeoutPromise, deferment = $q.defer();
				
				//Wait for min time (getRemainingWaitTime)
				timeoutPromise = $timeout(function() {
					$timeout.cancel(timeoutPromise);
					deferment.resolve(response);
				}, getRemainingWaitTime(response));
				
				return deferment.promise;
			},
			responseError: function(response) {
				var timeoutPromise, deferment = $q.defer();
				
				//Handle network problems
				if(response.status === 0) {
					response.data = {
						Message: $injector.get('resources').get().Services.ApiResource.BadNetwork.DisplayText
					};
				}
				
				//Handle any plain string error messages
				if(typeof response.data === 'string') {
					response.data = {
						Message: response.data
					};
					if(response.data.Message.charAt(0) === '"' && response.data.Message.charAt(response.data.Message.length-1)) {
						response.data.Message = response.data.Message.substring(1, response.data.Message.length-1);
					}
				}
				
				//Convert Login Dto Reason to Message
				if(angular.isDefined(response.data.Reason)) {
					response.data.Message = response.data.Reason;
					delete response.data.Reason;
				}
				
				//Put Errors on a more explicit property name
				if(angular.isDefined(response.data.Errors)) {
					response.data.PropertyMessages = response.data.Errors;
				}
				
				//Wait for min time (getRemainingWaitTime)
				timeoutPromise = $timeout(function() {
					$timeout.cancel(timeoutPromise);
					//Decide whether this errorResponse should stay an error, or act successful
					if(response.status === 304) {
						deferment.resolve(response);
					} else {
						redirectOnAuthError(response).catch(function() {
							deferment.reject(response);
						});
					}
				}, getRemainingWaitTime(response));
				
				return deferment.promise;
			}
		};
	});