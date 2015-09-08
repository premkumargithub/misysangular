angular.module('voyagerUiApp').controller('PasswordResetCtrl',
	function($q, $scope, $state, Login, PasswordRecoveryValues, Session) {
    'use strict';
		
		$scope.miHttpAlertTrigger = angular.noop;
		
		$scope.PasswordRecoveryValues = PasswordRecoveryValues;
    $scope.NewPasswordVerify = '';
		
    //Called on ng-submit
    $scope.submit = function(){
			var deferredAjax = $q.defer();
		
			Login.resetPassword($scope.PasswordRecoveryValues).then(function(){
				var submittedData = angular.copy($scope.PasswordRecoveryValues);
				
				Session.start({
					CompanyName: submittedData.CompanyName,
					Username: submittedData.UserName,
					Password: submittedData.NewPassword
				}, function(){
					deferredAjax.resolve('');
					$state.go('base.home.dashboard');
				}, function(){
					deferredAjax.resolve();
					$state.go('base.login-template.default');
				});
			}).catch(function(response) {
				$scope.miHttpAlertTrigger(response.status, response.data);
				deferredAjax.reject();
			});
			return deferredAjax.promise;
    };
  });
