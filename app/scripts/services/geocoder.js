/* jshint camelcase: false */
/* global google */

angular.module('voyagerUiApp').factory('Geocoder', function() {
	'use strict';
	
	var getZipFilteredResults, geocoder;
	getZipFilteredResults = function(zipOrPostal, results) {
		var filteredResults = [];
		
		angular.forEach(results, function(result) {
			angular.forEach(result.address_components, function(component) {
				if(component.long_name === zipOrPostal) {
					if(component.types.indexOf('postal_code') > -1) {
						filteredResults.push(result);
					}
				}
			});
		});
		
		return filteredResults;
	};
	geocoder = new google.maps.Geocoder();
	
	return {
		getAddressByZipOrPostal: function(zipOrPostal, successCallback, errorCallback) {
			geocoder.geocode({
				address: zipOrPostal
			}, function(results, status) {
				if(status === 'OK') {
					successCallback(getZipFilteredResults(zipOrPostal, results));
				} else {
					errorCallback();
				}
			});
		}
	};
});