/**
 * @ngdoc directive
 * @name voyagerUiApp.directive:miFileField
 * @restrict E
 *
 * @description
 *
 *
 * Note that ngRequired must be available to this directive in the future. However, ui-mask breaks ngRequired. Expect to repair this feature.
 * 
 * @scope
 * @param {string} miFieldProperty A reference to a resource property. For example Resources.Items.Properties.ID will reference the ID of item objects.
 * @param {string} ngModel https://docs.angularjs.org/api/ng/directive/ngModel
 * @param {string=} ngDisabled https://docs.angularjs.org/api/ng/directive/ngDisabled
 *
 */

angular.module('voyagerUiApp')
  .directive('miFileField', [function () {
		'use strict';
    
		return {
      restrict: 'E',
			replace: true,
			templateUrl: 'views/directives/mi-fields/mi-file-field.html',
			scope: {
				miFieldProperty: '@',
				miReadonly: '=',
				ngDisabled: '=',
				ngModel: '=',
				ngReadonly: '='
				//ngRequired: '=' ui-mask prevents ngRequired from operating properly
			},
			controller: 'MiFieldCtrl',
      link: function(scope, element, attrs) {
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
  }]);
