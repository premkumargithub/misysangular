angular.module('voyagerUiApp')
  .controller('AboutCtrl', ['apiRoot', '$http', '$scope', function(apiRoot, $http, $scope){
		'use strict';
		
		$scope.lastModifiedDate = '...';
		$http.get('/index.html').then(function(result) {
			var edtOffset, utcTime, lastModified;
			
			edtOffset = -4.0;
			lastModified = new Date(result.headers('Last-Modified'));
			utcTime = lastModified.getTime() + (lastModified.getTimezoneOffset() * 60000);
			
			$scope.lastModifiedDate = new Date(utcTime + (3600000*edtOffset)).toString();
		});
		
		$scope.apiInfo = {};
		$scope.loading = true;
		$http.get(apiRoot+'/about').then(function(result) {
			$scope.loading = false;
			$scope.apiInfo = result.data;
		});
	}]);
