angular.module('voyagerUiApp').factory('Messaging',
	function($q, $rootScope, $timeout) {
		'use strict';
		
		return {
			getUpdates: function() {
				var messagingRequestDeferment, messagingUpdates;
				messagingRequestDeferment = $q.defer();
				messagingUpdates = [{
					image: '',
					user: 'Michael Byrne',
					action: 'approved your request',
					message: '',
					time: '21 minutes ago'
				}, {
					image: '',
					user: 'David Brown',
					action: 'commented on your post',
					message: 'What do you think?',
					time: '1 hour ago'
				}];
				
				$timeout(function() {
					messagingRequestDeferment.resolve({
						status: 200,
						data: messagingUpdates
					});
				}, 1500);
				
				return messagingRequestDeferment.promise;
			}
		};
	});