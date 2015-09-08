angular.module('voyagerUiApp').directive('miHttpAlertRevisit',
	function(jQuery) {
		'use strict';
		
		return {
      template: '<div class="alert alert-dismissable {{alertClass}}">'+
				'<button type="button" class="close" ng-click="hideAlert()" aria-hidden="true">&times;</button>'+
					'<span ng-repeat="message in messages track by $index">'+
						'{{message}}<br ng-if="!$last" />'+
					'</span>'+
				'</div>'+
			'</div>',
			restrict: 'E',
			replace: true,
			scope: {
				miHttpAlertCancel: '=',
				miHttpAlertTrigger: '='
			},
			link: {
				post: function(scope, element, attrs) {
					scope.alertClass = '';
					scope.messages = [];
					
					scope.miHttpAlertTrigger = function(status, messages) {
						scope.alertClass = scope.getAlertClass(status);
						scope.messages = (function(messages) {
							var messagesWip = [];
							
							if(typeof messages === 'string') {
								messagesWip.push(messages);
							}
							if(typeof messages === 'object') {
								if(angular.isDefined(messages.Message)) {
									messagesWip.push(messages.Message);
								}
								if(angular.isDefined(messages.PropertyMessages)) {
									angular.forEach(messages.Errors, function(error) {
										messagesWip.push(error.ErrorMessage);
									});
								}
							}
							
							return messagesWip;
						}(messages));
						
						if(scope.messages.length > 0) {
							scope.showAlert();
						}
					};
					
					scope.hideAlert = function(transitionTime) {
						if(transitionTime === null) {
							transitionTime = 500;
						}
					
						jQuery(element).animate({
							opacity: 0
						}, transitionTime, 'linear', function() {
							jQuery(element).css('display', 'none');
						});
					};
					
					if(angular.isDefined(attrs.miHttpAlertCancel)) {
						scope.miHttpAlertCancel = function() {
							scope.hideAlert();
						};
					}
					
					scope.showAlert = function(transitionTime) {
						if(transitionTime === null) {
							transitionTime = 500;
						}
						
						jQuery(element).css('display', 'block');
						jQuery(element).animate({
							opacity: 1
						}, transitionTime);
					};
					
					scope.getAlertClass = function(status) {
						var alertClass, statusType;
						
						alertClass = '';
						statusType = Math.floor(status/100);
						
						if(statusType === 1) {					//Informational class
							alertClass = 'alert-info';
						} else if (statusType === 2) {  //Success class
							alertClass = 'alert-success';
						} else if (statusType === 3) {  //Redirection classes
							if(status === 304) {
								alertClass = 'alert-success';
							} else {
								alertClass = 'alert-warning';
							}
						} else if (statusType === 4) {  //Client Error class
							alertClass = 'alert-danger';
						} else {											  //Server Error class (Also handles Network errors of status 0)
							alertClass = 'alert-danger';
						}
						
						return alertClass;
					};
					
					scope.hideAlert(0);
				}
			}
		};
	});