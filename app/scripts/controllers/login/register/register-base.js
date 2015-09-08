angular.module('voyagerUiApp').controller('RegisterBaseCtrl',
	function(CompanyRegistration, $q, $scope) {
		'use strict';
		
		$scope.phone = {
			base: '',
			extension: ''
		};
		
		$scope.company = {
			CompanyName: '',
			ZipCode: '',
			City: '',
			State: '',
			Country: 'United States',
			Address1: '',
			Address2: '',
			Address3: '',
			Address4: '',
			ContactName: '',
			JobTitle: '',
			EmailAddress: '',
			Phone: ''
		};

		/*
		//Use this for develop to bypass filling the forms 
		$scope.company = {
			CompanyName: 'Matteo\'s Company',
			ZipCode: '05055',
			City: 'Norwich',
			State: 'VT',
			Country: 'United States',
			Address1: '1234 Main',
			Address2: '123',
			Address3: '12',
			Address4: '1',
			ContactName: 'Matteo',
			JobTitle: 'Admin',
			EmailAddress: 'matteo@misysinc.com',
			Phone: ''
		};
		$scope.phone.base ="4153687981"
		
		*/
		
		$scope.$watchGroup(['phone.base', 'phone.extension'], function() {
			if($scope.phone.extension.length > 0) {
				$scope.company.Phone = $scope.phone.base + ' Ext. ' + $scope.phone.extension;
			} else {
				$scope.company.Phone = $scope.phone.base;
			}
		});
	});