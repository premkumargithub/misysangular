angular.module('voyagerUiApp').directive('miTextareaSupplierField',
	function () {
		'use strict';
    
		return {
			templateUrl: 'views/directives/mi-fields/mi-textarea-supplier-field.html',
      restrict: 'E',
			replace: true,
			scope: {
				miFieldProperty: '@',
				miReadonly: '=',
				ngDisabled: '=',
				ngModel: '=',
				ngReadonly: '=',
				ngRequired: '='
			},
			controller: 'MiFieldCtrl',
      link: function postLink(scope, element, attrs) {
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
      }
    };
  });
