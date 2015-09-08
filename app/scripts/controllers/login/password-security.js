angular.module('voyagerUiApp').controller('PasswordSecurityCtrl',
	function ($q, $scope, $state, Login, PasswordRecoveryValues) {
		'use strict';
		
		$scope.miHttpAlertTrigger = angular.noop;

		//Bind existing info to the view
		$scope.PasswordRecoveryValues = PasswordRecoveryValues;

		$scope.securityQuestionReady = false;
		Login.getSecurityQuestion(PasswordRecoveryValues.AuthCode).then(function(response) {
			$scope.SecurityQuestion = response.data.SecurityQuestion;
			$scope.securityQuestionReady = true;
		});
		
		//Called on ng-submit
		$scope.submit = function(){
			var deferredAjax, submittedData;
			deferredAjax = $q.defer();
			submittedData = angular.copy($scope.PasswordRecoveryValues);
		
			Login.verifySecurityAnswer(submittedData).then(function(response){
				deferredAjax.resolve('');
			
				//IE interprets "true" as "true", FF/Chrome interpret "true" as true
				if(String(response.data) === 'true'){
					PasswordRecoveryValues.SecurityAnswer = submittedData.SecurityAnswer;
					$state.go('base.login-template.password-recovery.password-reset');
				} else {
					$scope.miHttpAlertTrigger(400, $scope.resourcesObj.Services.ApiResource.IncorrectAnswer.DisplayText);
				}
			}).catch(function(response){
				$scope.miHttpAlertTrigger(response.status, response.data);
				deferredAjax.reject('');
			});
			
			return deferredAjax.promise;
		};
	});
