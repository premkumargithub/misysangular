angular.module('voyagerUiApp')
  .factory('helpResources', ['$http', '$state',
		function ($http, $state) {
			'use strict';
			
			var helpUrls = {};
			
			return {
				init: function(successCallback, errorCallback) {
					$http.get('/manual_components/help_resources.json')
						.success(function(data, status, headers, config) {
							helpUrls = data;
							successCallback({
								data:data,
								status:status,
								headers:headers,
								config:config
							});
						}).error(errorCallback)
					;
				},
				getHelpUrl: function(type) {
					var stateName	= $state.current.name;
					
					while(stateName !== 'base') {
						if(angular.isDefined(helpUrls[type][stateName])) {
							break;
						}
						
						if(stateName.lastIndexOf('.') < 0) {
							stateName = 'base';
						} else {
							stateName = stateName.substr(0, stateName.lastIndexOf('.'));
						}
					}
					
					return helpUrls[type][stateName];
				}
			};
		}
	]);
