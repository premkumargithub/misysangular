angular.module('voyagerUiApp').controller('CompanyPreferencesCtrl',
    function (Company, $scope) {
        'use strict';
        var companyPreferencesArray = [];
        var _initData = function(){
            Company.getCompanyPreference({},
                function success(data) {
                    if(data.length === 0){
                        $scope.companyPreference.isNew = true;
                    }
                    console.log(data);
                    for (var attrname in data[0]) {
                        companyPreferencesArray[attrname] = data[0][attrname];
                    } //
                    angular.extend($scope.companyPreference, companyPreferencesArray);
                },
                function error(response) {
                    console.log('error resposne:' + JSON.stringify(response));
                }
            );
        };

        if(!angular.isDefined($scope.companyPreference.IsCreateSalesConfirmations)){
            _initData();
        }
    }
);