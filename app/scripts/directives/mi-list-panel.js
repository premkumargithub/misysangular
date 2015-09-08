angular.module('voyagerUiApp')
  .directive('miListPanel', function () {
		'use strict';

		return {
      scope: {
        miListPanelList: '='
      },
      template: '<div class="panel panel-default panel-drop-down">'+
        '<div ng-click="toggleDown()" class="panel-heading">'+
          '<h1 class="panel-title"><span class="glyphicon" ng-class="{\'glyphicon-chevron-down\':down,  \'glyphicon-chevron-right\':!down}"></span>{{miListPanelList.title}}</h1>'+
        '</div>'+
        '<ul class="list-group" ng-show="down">'+
					'<li ng-repeat="option in miListPanelList.options" class="list-group-item" ui-sref="{{option.state}}" ng-click="retractSidebar()" ui-nested="active" mi-bound-title="{{option.name}}">'+
						'<div class="item-name"><p>{{option.name}}</p></div>'+
						'<div class="selected"><span class="glyphicon glyphicon-chevron-right"></span></div>'+
						'<div class="clearfix"></div>'+
					'</li>'+
        '</ul>'+
      '</div>',
      restrict: 'E',
      replace: true,
      link: function(scope) {
        scope.down = true;
        scope.toggleDown = function(){
          scope.down = !scope.down;
        };
				
				//Triggers sidebar slide, listener is in HomeCtrl
				scope.retractSidebar = function() {
					scope.$emit('toggleSidebar');
				};
      }
    };
  });
