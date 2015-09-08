/**
 * @ngdoc directive
 * @name voyagerUiApp.directive:miColorField
 * @restrict E
 *
 * @description
 * A wrapper for kendo's custom color picker (http://demos.telerik.com/kendo-ui/colorpicker/index). Given a reference string for a resource property, it prepends a label.
 * 
 * @scope
 * @param {string} miFieldProperty A reference to a resource property. For example Resources.Items.Properties.ID will reference the ID of item objects.
 * @param {string} ngModel https://docs.angularjs.org/api/ng/directive/ngModel
 * @param {string=} ngDisabled https://docs.angularjs.org/api/ng/directive/ngDisabled
 *
 */

angular.module('voyagerUiApp').directive('miColorField',
	function(jQuery) {
		'use strict';
		
		return {
			templateUrl: 'views/directives/mi-fields/mi-color-field.html',
			restrict: 'E',
			replace: true,
			scope: {
				miFieldProperty: '@',
				ngModel: '=',
				ngDisabled: '='
			},
			controller: 'MiFieldCtrl',
			link: function postLink(scope, element) {
				element = jQuery(element);
				
				scope.displayText = scope.getDisplayText(scope.miFieldProperty);
			
				scope.initColorPicker = function() {
					element.find('input').kendoColorPicker({
						value: scope.ngModel,
						buttons: true
					});
				};
					
				scope.cancelWatcher = scope.$watch('ngModel', function() {
					if(angular.isDefined(scope.ngModel)) {
						scope.initColorPicker();
						scope.cancelWatcher();
					}
				});
			}
		};
	});