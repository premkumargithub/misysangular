angular.module('voyagerUiApp').directive('miFinderField',
	function($compile, jQuery) {
		'use strict';
		return {
			templateUrl: 'views/directives/mi-fields/mi-finder-field.html',
			restrict: 'E',
			replace: true,
			scope: {
				miFieldProperty: '@',
				gridTag: '@',
				gridClass: '@',
				ngModel: '=',
				ngDisabled: '=',
				ngRequired: '='
			},
			controller: 'MiFieldCtrl',
			link: {
				pre: function(scope, element) {
					var dataGridContainer, dataGridElement;
					scope.name = scope.getName(scope.miFieldProperty);
					dataGridContainer = jQuery(element).find('div.modal-finder div.modal-body section.content');
					dataGridElement = angular.element('<' + scope.gridTag + '/>');
					scope.onSelect = function(data) {
						if (scope.gridClass === 'department') {
							//scope.modelValue = data.DepartmentID;
							scope.ngModel = data.ResourceID;
						} else if (scope.gridClass === 'security') {
							//scope.modelValue = data.SecurityProfileID;
							scope.ngModel = data.ResourceID;
						} else if (scope.gridClass === 'users') {
							//	scope.modelValue = data.ID;
							scope.ngModel = data.ResourceID;
						}
						jQuery('.modal-finder .modal').modal('hide');
						scope.$parent.panelForm['' + scope.name].$setViewValue(scope.ngModel);
						scope.$parent.panelForm['' + scope.name].$render();
						//angular.element('' + scope.name).controller('MiFieldCtrl').$render();
						scope.$apply();


					};
					dataGridElement.attr('on-select', 'onSelect(data)');

					dataGridElement = $compile(dataGridElement)(scope);
					dataGridContainer.append(dataGridElement);
				},
				post: function(scope, element, attrs) {

					scope.displayText = scope.getDisplayText(scope.miFieldProperty);

					scope.showModalFinder = function(modalClass) {
						if (angular.isDefined(attrs.ngDisabled)) {
							if (scope.ngDisabled) {
								return;
							}
						}
						jQuery('.modal-finder.' + modalClass + ' .modal').modal({
							show: true,
							backdrop: false
						});
						jQuery('.modal-finder.' + modalClass + ' .modal-dialog').draggable({
							handle: '.modal-header'
						});
					};

					scope.toggleDropDown = function() {
						jQuery('.modal-finder .finder-dropdown-button').toggleClass('active');
						jQuery('.modal-finder .finder-dropdown').toggleClass('active');
					};


					scope.filterShown = false;
					scope.hideFilter = function() {
						scope.filterShown = false;
					};
					scope.showFilter = function() {
						scope.filterShown = true;
					};

					//					scope.setdirty = function() {
					//						//console.log('Changed to ' + newValue);
					//						scope.$parent.panelForm['' + scope.name].$setDirty();
					//					};
				}
			}
		};
	});
