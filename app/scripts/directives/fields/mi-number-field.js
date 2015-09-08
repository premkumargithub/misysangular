angular.module('voyagerUiApp')
  .directive('miNumberField', ['UserPreferences',
		function (UserPreferences) {
			'use strict';
			
			return {
				templateUrl: 'views/directives/mi-fields/mi-number-field.html',
				restrict: 'E',
				scope: {
					miFieldProperty: '@',
					miFieldNumberType: '@',
					miReadonly: '=',
					ngDisabled: '=',
					ngModel: '=',
					ngReadonly: '=',
					ngRequired: '=',
					ngMaxlength: '='
				},
				controller: 'MiFieldCtrl',
				link: {
					pre: function(scope, element, attrs) {
						scope.displayText = scope.getDisplayText(scope.miFieldProperty);
						
						scope.isReadonly = function() {
							var readonly = false;
							
							if(angular.isDefined(attrs.miReadonly)) {
								readonly = scope.miReadonly;
							}
							
							return readonly;
						};
						
						scope.isEmpty = function() {
							var empty = true;
							
							if(angular.isDefined(scope.ngModel)) {
								if(scope.ngModel !== null) {
									if(scope.ngModel.length > 0) {
										empty = false;
									}
								}
							}
							
							return empty;
						};
						
						scope.getPrecision = function() {
							return UserPreferences.get().DecimalPrecision[scope.miFieldNumberType];
						};
						
						scope.showCurrency = function() {
							var isCurrency = true;
							if(scope.miFieldNumberType === 'Quantity') {
								isCurrency = false;
							}
							return isCurrency;
						};
						
						scope.setNumberAsString = function() {
							scope.ngModel = scope.ngModel.toFixed(scope.getPrecision());
						};
						
						scope.numberToString = scope.$watch('ngModel', function() {
							if(angular.isDefined(scope.ngModel)) {
								if(typeof scope.ngModel === 'number') {
									scope.setNumberAsString();
								}
								scope.numberToString();
							}
						});

						if(angular.isUndefined(attrs.ngMaxlength)) {
							scope.ngMaxlength = -1;
						}
					}
				}
			};
		}
  ]);
