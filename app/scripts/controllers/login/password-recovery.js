angular.module('voyagerUiApp').controller('PasswordRecoveryCtrl',
  function($scope, $state, $location, Login, PasswordRecoveryValues) {
    'use strict';

    if (angular.isDefined($scope.$parent.PasswordRecoveryPrefield)) {
      PasswordRecoveryValues.CompanyName = $scope.$parent.PasswordRecoveryPrefield.CompanyName;
      PasswordRecoveryValues.UserName = $scope.$parent.PasswordRecoveryPrefield.UserName;
    }
    
    $scope.miHttpAlertTrigger = angular.noop;
    $scope.PasswordRecoveryValues = PasswordRecoveryValues;
    $location.url($location.path());
    $scope.submit = function() {
      var request = Login.mailAuthCode($scope.PasswordRecoveryValues).then(function(response) {
        PasswordRecoveryValues.CompanyName = response.data.CompanyName;
        PasswordRecoveryValues.UserName = response.data.UserName;
        $state.go('base.login-template.password-recovery.password-reset-code');
      }).catch(function(response) {
        $scope.miHttpAlertTrigger(response.status, response.data);
      });

      return request;
    };
  });