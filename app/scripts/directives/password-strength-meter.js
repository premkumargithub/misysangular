angular.module('voyagerUiApp')
	.directive('passwordStrengthMeter', function(resources, UsersService) {
		'use strict';

		var resourcesObj = resources.get();

		return {
			template: '<div class="password-strength">' +
				'<label>' + resourcesObj.Directives.PasswordStrengthMeter.DisplayText + '</label>' +
				'<ul class="meter">' +
					'<li class="insufficient" ng-class="{invalid:passwordIsEmpty(password)}"></li>' +
					'<li class="fair" ng-class="{invalid:!passwordIsFair(password)}"></li>' +
					'<li class="good" ng-class="{invalid:!passwordIsGood(password)}"></li>' +
					'<li class="strong" ng-class="{invalid:!passwordIsStrong(password)}"></li>' +
				'</ul>' +
				'<span ng-class="{hidden:passwordIsEmpty(password)}">{{strengthLabel}}</span>' +
				'</div>',
			restrict: 'A',
			scope: {
				password: '='
			},
			link: function(scope) {
				var insufficientLabel = resourcesObj.Directives.PasswordStrengthMeter.StrengthLabels.Invalid.DisplayText;
				var fairLabel = resourcesObj.Directives.PasswordStrengthMeter.StrengthLabels.Fair.DisplayText;
				var goodLabel = resourcesObj.Directives.PasswordStrengthMeter.StrengthLabels.Good.DisplayText;
				var strongLabel = resourcesObj.Directives.PasswordStrengthMeter.StrengthLabels.Strong.DisplayText;
				scope.strengthLabel = insufficientLabel;
				
				scope.passwordIsEmpty = function(password) {
					if (angular.isDefined(password) && password.length > 0) {
						return false;
					}
					return true;
				};
					
				//scope.passwordIsValid = UsersService.passwordIsValid;
					
				scope.passwordIsFair = function(password){
					if (angular.isDefined(password)){
						if (UsersService.passwordIsFair(password)){
							return true;
						}
					}
					return false;
				};
				
				scope.passwordIsGood = function(password){
					if (angular.isDefined(password)){
						if (UsersService.passwordIsGood(password)){
							return true;
						}
					}
					return false;
				};
				
				scope.passwordIsStrong = function(password){
					if (angular.isDefined(password)){
						if (UsersService.passwordIsStrong(password)){
							return true;
						}
					}
					return false;
				};
				
				//Update strength label
				//One watcher in the postlink is better than 4 in the template
				scope.$watch('password', function() {
					if(scope.passwordIsFair(scope.password)) {
						scope.strengthLabel = fairLabel;
						
						if(scope.passwordIsGood(scope.password)) {
							scope.strengthLabel = goodLabel;
							
							if(scope.passwordIsStrong(scope.password)) {
								scope.strengthLabel = strongLabel;
							}
						}
					} else {
						scope.strengthLabel = insufficientLabel;
					}
				});
			}
		};
	});