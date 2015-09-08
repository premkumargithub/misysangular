angular.module('voyagerUiApp').factory('PasswordRecoveryValues',
    function () {
    'use strict';

    return {
        AuthCode : '',
        CompanyName : '',
        EmailAddress : '',
        NewPassword : '',
        UserName : '',
        SecurityAnswer : '',

        clear : function () {
            this.AuthCode = '';
            this.CompanyName = '';
            this.EmailAddress = '';
            this.NewPassword = '';
            this.UserName = '';
            this.SecurityAnswer = '';
          }

      };
  });
