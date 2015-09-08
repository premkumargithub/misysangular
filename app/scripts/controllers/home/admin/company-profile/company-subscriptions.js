angular.module('voyagerUiApp').controller('CompanySubscriptionsCtrl', function (Company, $scope) {
    'use strict';
    
    //Array to store traverse through the response data object
    var companySubscriptionsArray = [];
    $scope.misysInventoryCollection = [];
    $scope.accountingPackageCollection = [];
    
    $scope.companySubscriptionRequest = Company.getSubscriptionComponents({}, function success(data){
        console.log(data);
     
        for (var attrname in data[0]) {
          console.log(attrname + ' -> ' + data[0][attrname]);
          companySubscriptionsArray[attrname] = data[0][attrname];
        }
        
        angular.extend($scope.companySubscription, companySubscriptionsArray);
      },
      function error(response) {
        console.log('error resposne:' + JSON.stringify(response));
      }
    );
  }
);