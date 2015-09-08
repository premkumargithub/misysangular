angular.module('voyagerUiApp')
  .directive('miMaskEditor', [
		function() {
			'use strict';
			
			return {
				templateUrl: 'views/directives/mi-mask-editor.html',
				restrict: 'E',
				replace:true,
				scope: {},
				link: function(scope) {
					scope.literalMode = 'literal';
					scope.maskMode = 'mask';
					scope.mode = scope.literalMode;
					
					scope.testAreaShown = false;
					scope.toggleTestArea = function() {
						scope.testAreaShown = !scope.testAreaShown;
					};
				}
			};
		}
	]);