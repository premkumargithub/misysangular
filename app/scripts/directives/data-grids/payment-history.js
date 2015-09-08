angular.module('voyagerUiApp').directive('miPaymentHistoryDataGrid',
	function(Company, resources) {
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
					scope.refreshEvent = Company.onChangeEvent;

					if (angular.isDefined(attrs.contractable)) {
						scope.contractable = true;
					} else {
						scope.contractable = false;
					}

					if (scope.editable === 'true') {
						throw 'Suppliers Data Grid cannot be editable because it has not defined create, update, or destroy requests.';
					}
					scope.destroy = function(data) {
						return Company.delete(data.ResourceID);
					};
					scope.read = function(params) {
						scope.paymentHistory = {};
						return Company.GetPaymentHistory(params,
							function success(data) {
								//console.log(JSON.stringify(data));
								for (var attrname in data) {
									scope.paymentHistory[attrname] = data[attrname];
								}
								//console.log($scope.companyProfile);
								return scope.paymentHistory;
							},
							function error(response) {
								console.log('error resposne:' + JSON.stringify(response));
							});
					};
					scope.onSelect = function(data) {
						scope.onRowSelect({
							data: data
						});
					};

					scope.columns = [
						{
							id: 'Date',
							title: scope.resourcesObj.Resources.Company.CompanyProfile.Properties.Date.DisplayText,
							field: 'Date',
							headerAttributes: {
								'class': 'string-field'
							},
							attributes: {
								'class': 'string-field'
							},
							width: 200
						},
						{
							id: 'Method',
							title: scope.resourcesObj.Resources.Company.CompanyProfile.Properties.Method.DisplayText,
							field: 'Method',
							headerAttributes: {
								'class': 'string-field'
							},
							attributes: {
								'class': 'string-field'
							},
							width: 300
						},
						{
							id: 'Account',
							title: scope.resourcesObj.Resources.Company.CompanyProfile.Properties.Account.DisplayText,
							field: 'Account',
							//template: Suppliers.statusToString,
							headerAttributes: {
								'class': 'string-field'
							},
							attributes: {
								'class': 'string-field'
							},
							width: 250
						},
						{
							id: 'Amount',
							title: scope.resourcesObj.Resources.Company.CompanyProfile.Properties.Amount.DisplayText,
							field: 'Amount',
							headerAttributes: {
								'class': 'string-field'
							},
							attributes: {
								'class': 'string-field'
							},
							width: 200
						},
						{} //The auto-resize column when the main panel size changes
					];
				}
			}
		};
	});
