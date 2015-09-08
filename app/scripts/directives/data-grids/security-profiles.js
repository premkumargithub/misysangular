/**
 * @ngdoc directive
 * @name voyagerUiApp.directive:miSecurityProfilesDataGrid
 * @restrict E
 *
 * @description
 * A data grid which lists all security Profiles of the company using predefined columns.
 *
 * @scope
 * @param {string=} editable An expression which evaluates to true or false. UI elements are added which enables creating, updating, and deleting entries.
 * @param {string=} onSelect A method on the scope which is essentially an event listener. The data of the selected record is passed to this method. **Example:** on-select="onAccountSelect(data)"
 *
 */

angular.module('voyagerUiApp').directive('miSecurityProfilesDataGrid',
	function(SecurityProfiles, resources) {
		'use strict';

		return {
			restrict: 'E',
			replace: true,
			scope: {
				editable: '@',
				onRowSelect: '&onSelect'
			},
			templateUrl: 'views/directives/mi-data-grid.html',
			link: {
				pre: function(scope, element, attrs) {
					scope.resourcesObj = resources.get();
					scope.refreshEvent = SecurityProfiles.onChangeEvent;

					if (angular.isDefined(attrs.contractable)) {
						scope.contractable = true;
					} else {
						scope.contractable = false;
					}

					if (scope.editable === 'true') {
						throw 'Security Profiles Data Grid cannot be editable because it has not defined create, update, or destroy requests.';
					}
					scope.destroy = function(data) {
						return SecurityProfiles.delete(data.ResourceID);
					};
					scope.read = function(params) {
						return SecurityProfiles.query(params);
					};
					scope.onSelect = function(data) {
						scope.onRowSelect({
							data: data
						});
					};

					scope.columns = [
						{
							id: 'SecurityProfileID',
							title: scope.resourcesObj.Resources.SecurityProfiles.Properties.SecurityProfileID.DisplayText,
							field: 'SecurityProfileID',
							headerAttributes: {
								'class': 'string-field'
							},
							attributes: {
								'class': 'string-field'
							},
							width: 250
						},
						{
							id: 'SecurityProfileName',
							title: scope.resourcesObj.Resources.SecurityProfiles.Properties.SecurityProfileName.DisplayText,
							field: 'SecurityProfileName',
							headerAttributes: {
								'class': 'string-field'
							},
							attributes: {
								'class': 'string-field'
							}
						},
						{}
					];
				}
			}
		};
	});
