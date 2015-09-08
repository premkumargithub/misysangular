angular.module('voyagerUiApp').directive('miTemplateTabs',
	function() {
		'use strict';
		
		return {
			template: '<nav>'+
				'<ul class="nav nav-tabs">'+
					'<li ng-hide="hideTabs()" ng-repeat="tab in tabsList" ng-class="{active:isActive(tab.templateUrl)}" ng-click="changeTemplate(tab.templateUrl)">'+
						'<a>{{tab.name}}</a>'+
					'</li>'+
				'</ul>'+
			'</nav>',
			restrict: 'E',
			replace:true,
			scope: {
				templateUrl: '=',
				tabsList: '='
			},
			link: function(scope) {
				scope.changeTemplate = function(newTemplate) {
					scope.templateUrl = newTemplate;
				};
				
				scope.isActive = function(tabTemplate) {
					return tabTemplate === scope.templateUrl;
				};
				
				scope.hideTabs = function() {
					var hidden = true;
					
					if(angular.isDefined(scope.tabsList)) {
						if(scope.tabsList.length > 1) {
							hidden = false;
						}
					}
					
					return hidden;
				};
			}
		};
	});