/**
 * @ngdoc directive
 * @name voyagerUiApp.directive:miCheckboxField
 * @restrict E
 *
 * @description
 * A wrapper of input[checkbox]. Given a reference string for a resource property, it prepends a prepends a label.
 *
 * @scope
 * @param {string} miFieldProperty A reference to a resource property. For example Resources.Items.Properties.ID will reference the ID of item objects.
 * @param {string} ngModel https://docs.angularjs.org/api/ng/directive/ngModel
 * @param {string=} ngDisabled https://docs.angularjs.org/api/ng/directive/ngDisabled
 *
 */

angular.module('voyagerUiApp').directive('miCheckboxField',
	function() {
		'use strict';

		return {
			restrict: 'E',
			replace: true,
			templateUrl: 'views/directives/mi-fields/mi-checkbox-field.html',
			scope: {
				miFieldProperty: '@',
				ngDisabled: '=',
				ngModel: '='
			},
			controller: 'MiFieldCtrl',
			link: function(scope) {
				scope.displayText = scope.getDisplayText(scope.miFieldProperty);
			}
		};
	});
