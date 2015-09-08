angular.module('voyagerUiApp').directive('miPasswordField',
	function(resources, $sce) {
		'use strict';
		return {
			templateUrl: 'views/directives/mi-fields/mi-password-field.html',
			restrict: 'E',
			replace: true,
			scope: {
				miFieldPlaceholder: '@',
				miFieldProperty: '@',
				miFieldRequirements: '@',
				ngDisabled: '=',
				ngMaxlength: '@',
				ngMinlength: '@',
				ngModel: '=',
				ngRequired: '=',
				validate: '=' //(bool) if the directive should validate
			},
			controller: 'MiFieldCtrl',
			link: {
				pre: function(scope, element, attrs) {
					var resourcesObj = resources.get(),
						input = element.find('input');

					if (angular.isUndefined(attrs.validate)) {
						scope.validate = true;
					}
					scope.name = scope.getName(scope.miFieldProperty);
					scope.displayText = scope.getDisplayText(scope.miFieldProperty);
					scope.type = 'password';
					
					scope.validRequired = function() {
						return input.hasClass('ng-valid-required');
					};
					
					scope.validMinlength = function() {
						return input.hasClass('ng-valid-minlength');
					};

					scope.requirementsText = (function() {
						var text = '';

						if (angular.isDefined(attrs.miFieldRequirements)) {
							text = resourcesObj.Resources.User.Properties.Password.MinLength.DisplayText +
								'<br />' +
								resourcesObj.Resources.User.Properties.Password.Pattern.DisplayText;
						}

						return $sce.trustAsHtml(text);
					}());

					scope.isEmpty = function() {
						var empty = false;

						if (angular.isDefined(scope.ngModel)) {
							if (scope.ngModel !== null) {
								if (scope.ngModel.length === 0) {
									empty = true;
								}
							} else {
								empty = true;
							}
						} else {
							empty = true;
						}

						if (empty && scope.isUnmasked()) {
							scope.toggleMask();
						}

						return empty;
					};

					scope.isUnmasked = function() {
						return scope.type === 'text';
					};

					scope.toggleMask = function() {
						if (scope.type === 'password') {
							scope.type = 'text';
						} else {
							scope.type = 'password';
						}
					};
					
					if(angular.isUndefined(attrs.ngMaxlength)) {
						scope.ngMaxlength = -1;
					}
					
					if(angular.isUndefined(attrs.ngMinlength)) {
						scope.ngMinlength = -1;
					}

					//HTML entities set as a placeholder from a scope var were taken literally
					//The template by default has that placeholder and it is removed when appropriate
					if (angular.isUndefined(attrs.miFieldPlaceholder)) {
						element.find('input').attr('placeholder', '');
					}

					//Remove form-control from input if directive has class no-form-control
					if (angular.isDefined(attrs.class)) {
						if (element.hasClass('no-form-control')) {
							element.find('input').removeClass('form-control');
						}
					}
				}
			}
		};
	});