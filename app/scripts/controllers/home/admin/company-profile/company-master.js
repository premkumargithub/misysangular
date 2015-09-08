angular.module('voyagerUiApp').controller('CompanyMasterCtrl',
    function (Company, $scope) {
        'use strict';
        console.log('in company maseter controller 123');
        var companyMasterArray = [];
        var makeCompanyMasterObjectFromRegInfo = function(data){
            var registerInfo = data[0];
            console.log(registerInfo);
            $scope.companyMaster.CompanyAddress = registerInfo.Addr1;
            $scope.companyMaster.CompanyAddress1 = registerInfo.Addr2;
            $scope.companyMaster.CompanyAddress2 = registerInfo.Addr3;
            $scope.companyMaster.CompanyAddress3 = registerInfo.Addr4;
            $scope.companyMaster.CompanyCity = registerInfo.City;
            $scope.companyMaster.CompanyState = registerInfo.State;
            $scope.companyMaster.CompanyWebsite = registerInfo.CompanyUrl;
            $scope.companyMaster.AdministrativeContactEmail = registerInfo.ContactEmailAddress;
            $scope.companyMaster.AdministrativeContactName = registerInfo.ContactName;
            $scope.companyMaster.CompanyCountry = registerInfo.Country;
            $scope.companyMaster.CompanyPostalCode = registerInfo.Zip;
            $scope.companyMaster.IsMultiCurrency = false;
            $scope.companyMaster.IsSecondaryBillingContactAsPrimary = true;
            $scope.companyMaster.IsPrimaryBillingContactAsAdmin = true;

            console.log($scope.companyMaster);
        };


        var _initData = function(){
            Company.getCompanyMaster({},
                function success(data) {
                    console.log(data);
                    if(data.length === 0){
                        $scope.companyMaster.isNew = true;
                        console.log($scope.companyProfile);
                        Company.getRegistrationInfo({}, $scope.companyProfile.CompanyID,
                            function (data){
                                console.log(data);
                                makeCompanyMasterObjectFromRegInfo(data);

                            },
                            function(){
                                console.log('Registeration Info API Failed');
                            }
                        );
                    } else {
                        for (var attrname in data[0]) {
                            console.log(attrname + ' -> ' + data[0][attrname]);
                            companyMasterArray[attrname] = data[0][attrname];
                        } //
                    }
                    angular.extend($scope.companyMaster, companyMasterArray);
                },
                function error(response) {
                    console.log('error resposne:' + JSON.stringify(response));
                }
            );

        };
        if(!angular.isDefined($scope.companyMaster.CompanyCountry)) {
            _initData();
        }
        var primaryAdminWatch;
        var primarySecWatch;

        $scope.$watch('companyMaster.IsPrimaryBillingContactAsAdmin', function (newVal) {
            console.log(newVal);
            if (newVal) {
                $scope.companyMaster.PrimaryBillingContactName = $scope.companyMaster.AdministrativeContactName;
                $scope.companyMaster.PrimaryBillingContactTelephone = $scope.companyMaster.AdministrativeContactTelephone;
                $scope.companyMaster.PrimaryBillingContactEmail = $scope.companyMaster.AdministrativeContactEmail;
                primaryAdminWatch = $scope.$watchGroup([
                    'companyMaster.AdministrativeContactEmail',
                    'companyMaster.AdministrativeContactName',
                    'companyMaster.AdministrativeContactTelephone',
                ], function () {
                    $scope.companyMaster.PrimaryBillingContactName = $scope.companyMaster.AdministrativeContactName;
                    $scope.companyMaster.PrimaryBillingContactTelephone = $scope.companyMaster.AdministrativeContactTelephone;
                    $scope.companyMaster.PrimaryBillingContactEmail = $scope.companyMaster.AdministrativeContactEmail;
                });
            } else {
                if (typeof(primaryAdminWatch) === 'function') {
                    primaryAdminWatch();
                }
            }
        });

        $scope.$watch('companyMaster.IsSecondaryBillingContactAsPrimary', function (newVal) {
            console.log(newVal);
            if (newVal) {
                $scope.companyMaster.SecondaryBillingContactName = $scope.companyMaster.PrimaryBillingContactName;
                $scope.companyMaster.SecondaryBillingContactTelephone = $scope.companyMaster.PrimaryBillingContactTelephone;
                $scope.companyMaster.SecondaryBillingContactEmail = $scope.companyMaster.PrimaryBillingContactEmail;
                primarySecWatch = $scope.$watchGroup([
                    'companyMaster.PrimaryBillingContactName',
                    'companyMaster.PrimaryBillingContactEmail',
                    'companyMaster.PrimaryBillingContactTelephone',
                ], function () {
                    $scope.companyMaster.SecondaryBillingContactName = $scope.companyMaster.PrimaryBillingContactName;
                    $scope.companyMaster.SecondaryBillingContactTelephone = $scope.companyMaster.PrimaryBillingContactTelephone;
                    $scope.companyMaster.SecondaryBillingContactEmail = $scope.companyMaster.PrimaryBillingContactEmail;
                });
            } else {
                if (typeof(primarySecWatch) === 'function') {
                    primarySecWatch();
                }
            }
        });

    }
);