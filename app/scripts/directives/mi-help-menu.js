angular.module('voyagerUiApp').directive('miHelpMenu',
	function(helpResources, resources) {
		'use strict';
		
		return {
			template: '<section class="help help-hidden" ng-class="{\'help-hidden\':hidden && videosHidden}">'+
				'<header>'+
					'<h1>Help</h1>'+
					'<span class="close glyphicon glyphicon-chevron-right" ng-click="hideBoth()"></span>'+
					'<a href="/help/main/index.htm" target="_blank" ng-click="hideBoth()">'+
						'<i class="new-window"></i>'+resources.get().Directives.MiHelpMenu.NewTab.DisplayText+
					'</a>'+
					'<div class="clearfix"></div>'+
				'</header>'+
				'<div class="iframe-left-border"></div>'+
				'<iframe src="" frameborder="0"/>'+
			'</section>',
			restrict:'E',
			replace:true,
			scope: {
				miHelpMenuToggle: '=',
				miHelpMenuToggleVideos: '='
			},
			link: {
				pre: function (scope, element) {
					scope.hidden = true;
					scope.videosHidden = true;
					
					//Define delegates
					scope.miHelpMenuToggle = function() {
						if(scope.hidden) {
							scope.showHelp(false);
						} else {
							scope.hideHelp(false);
						}
					};
					
					scope.miHelpMenuToggleVideos = function() {
						if(scope.videosHidden) {
							scope.showHelpVideos();
						} else {
							scope.hideHelpVideos();
						}
					};
					
					scope.loadPage = function(type) {
						var helpUrl = helpResources.getHelpUrl(type);
						
						element.find('a').attr('href', helpUrl);
						element.find('iframe').remove();
						element.append('<iframe src="'+helpUrl+'" frameborder="0" />');
					};
					
					scope.showHelp = function() {
						scope.loadPage('standard');
						scope.hideHelpVideos();
						scope.hidden = false;
						scope.$emit('HelpShown');
					};
					
					scope.hideHelp = function() {
						scope.hidden = true;
						scope.$emit('HelpHidden');
					};
					
					scope.showHelpVideos = function() {
						scope.loadPage('videos');
						scope.hideHelp();
						scope.videosHidden = false;
						scope.$emit('HelpVideosShown');
					};
					
					scope.hideHelpVideos = function() {
						scope.videosHidden = true;
						scope.$emit('HelpVideosHidden');
					};
					
					scope.hideBoth = function() {
						scope.hidden = true;
						scope.videosHidden = true;
						scope.$emit('HelpHidden');
						scope.$emit('HelpVideosHidden');
					};
				}
			}
		};
	});