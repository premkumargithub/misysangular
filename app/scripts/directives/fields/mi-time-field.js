angular.module('voyagerUiApp').directive('miTimeField',
	function(jQuery) {
		'use strict';
		
		return {
			templateUrl: 'views/directives/mi-fields/mi-time-field.html',
			restrict: 'E',
			scope: {
				miFieldUnits: '@',
				miFieldProperty: '@',
				miFieldToUnits: '@',
				miReadonly: '=',
				ngDisabled: '=',
				ngModel: '=',
				ngReadonly: '='
			},
			controller: 'MiFieldCtrl',
			link: {
				post: function(scope, element, attrs) {
					element = jQuery(element);
					
					scope.displayText = scope.getDisplayText(scope.miFieldProperty);
					scope.getDisplayUnits = function() {
						var units = scope.miFieldUnits;
						
						if(angular.isDefined(scope.miFieldToUnits)) {
							units = scope.miFieldToUnits;
						}
						
						//Convert with resourcesObj
						return units;
					};
					
					scope.isReadonly = function() {
						var readonly = false;
						
						if(angular.isDefined(attrs.miReadonly)) {
							readonly = scope.miReadonly;
						}
						
						return readonly;
					};
					
					scope.convertUnits = function(value, from, to) {
						var wipValue = angular.copy(value);
						
						if(angular.isDefined(to) && to !== null) {
							if(from === 'minutes') {
								if(to === 'hours') {
									wipValue /= 60;
								}
							} else if(from === 'hours') {
								if(to === 'minutes') {
									wipValue *= 60;
								}
							}
						}
						
						return wipValue;
					};
					
					scope.configurations = {
						hours: {
							format: '#.00 '+scope.getDisplayUnits(),
							max: 24,
							min: 0.25,
							step: 0.25
						},
						minutes: {
							format: '# '+scope.getDisplayUnits(),
							min: 0,
							step: 1
						},
						decimalPlaces: {
							format: '# ',
							max: 6,
							min: 0,
							step: 1
						}
					};
					
					scope.getConfiguration = function() {
						var configuration = scope.configurations[scope.miFieldUnits];
						
						if(angular.isDefined(scope.miFieldToUnits)) {
							configuration = scope.configurations[scope.miFieldToUnits];
						}
						
						return configuration;
					};
					
					scope.displayModel = scope.convertUnits(angular.copy(scope.ngModel), scope.miFieldUnits, scope.miFieldToUnits);
					element.find('input').kendoNumericTextBox(angular.extend({}, {
							change: function() {
								scope.ngModel = scope.convertUnits(this.value(), scope.miFieldToUnits, scope.miFieldUnits);
								scope.$digest();
							},
							value: scope.displayModel
						},
						scope.getConfiguration()
					));
					
					//The displayModel is incorrect when ngModel changes externally after initialization
					//This watches and updates the numericTextBox when ngModel changes externally
					scope.$watch('ngModel', function() {
						var numericTextBox = element.find('input[data-role=numerictextbox]').data('kendoNumericTextBox');
						numericTextBox.value(scope.convertUnits(angular.copy(scope.ngModel), scope.miFieldUnits, scope.miFieldToUnits));
					});
				}
			}
		};
	});
