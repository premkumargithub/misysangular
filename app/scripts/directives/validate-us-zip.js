angular.module('voyagerUiApp').directive('validateUszip', ['Geocoder', '$q', function(Geocoder, $q) {
	'use strict';

	console.log('zip');
	return {
		restrict: 'A',
		require: 'ngModel',
		scope: {
			validateUszip: '='
		},
		link: function(scope, element, attrs, ngModelController) {

			var checkZip = function(zip) {

				var deferment = $q.defer();

				if (scope.validateUszip !== 'United States') {
					deferment.resolve(true);
				} else {


					if (zip.length === 0) {

						deferment.resolve(true);

					} else if (zip.length < 5) {

						deferment.resolve(false);

					} else {
						Geocoder.getAddressByZipOrPostal(zip, function(results) {
							if (results.length > 0) {
								//console.log(results); //keep this if you want to see the result for a given zip
								angular.forEach(results[0].address_components, function(component) {				// jshint ignore:line
									if (component.types.indexOf('country') > -1 && component.short_name === 'US') {  // jshint ignore:line
										deferment.resolve(true);
									}

								});

							}
							deferment.resolve(false);
						}, function() { // if the API fails, we assume the zip is valid
							deferment.resolve(false);
						});
					}
				}
				return deferment.promise;

			};

			scope.$watch('validateUszip', function() {

				ngModelController.$validate();
			});

			ngModelController.$asyncValidators.zip = function(modelValue) {
				return checkZip(modelValue).
				then(function resolved(promiseResult) {
					// this means validation passes
					if (promiseResult) {

						return true;
					} else {

						return $q.reject('not valid us zip');
					}
				}, function rejected() {
					//this means validation passes if the promise fails
					return true;
				});

			};
		}
	};
}]);