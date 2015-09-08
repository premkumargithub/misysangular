angular.module('voyagerUiApp').controller('PasswordAuthorizationCtrl',
	function ($scope, $location, $state, Login, PasswordRecoveryValues) {
    'use strict';
		
		$scope.miHttpAlertTrigger = angular.noop;
		
    //Show 'em if you've got 'em
    $scope.PasswordRecoveryValues = PasswordRecoveryValues;
    $scope.PasswordRecoveryValues.AuthCode = $location.search().authcode;
		
    $scope.submit = function() {
			var request, submittedData;
			submittedData = angular.copy($scope.PasswordRecoveryValues);
			
			request = Login.verifyAuthCode(submittedData.AuthCode, submittedData).then(function(response){
				PasswordRecoveryValues.CompanyName = response.data.CompanyName;
				PasswordRecoveryValues.UserName = response.data.UserName;
				
				if(String(response.data.RequireResetPasswordSecAnswer) === 'true') {
					$state.go('base.login-template.password-recovery.password-security');
				} else {
					$state.go('base.login-template.password-recovery.password-reset');
				}
			}).catch(function(response) {
				$scope.miHttpAlertTrigger(response.status, response.data);
			});
			
			return request;
    };
  });
