angular.module('voyagerUiApp').controller('CompanyProfileCtrl',
    function (Session, $scope, Company, $q) {
        'use strict';

        $scope.companyProfile = {};
        $scope.companyProfileRequest = Company.getCompanyProfile({},
            function success(data) {
                for (var attrname in data) {
                    $scope.companyProfile[attrname] = data[attrname];
                }
            },
            function error(response) {
                console.log('error resposne:' + JSON.stringify(response));
            });

        $scope.companyProfile.CompanyID = Session.getSessionData().companyID;
        $scope.companyProfile.Integration = 0;
        $scope.companyProfile.CostingMethod = 0;

        $scope.companyProfile.CreateSalesEstimates = false;
        $scope.companyProfile.CreateSalesQuotations = false;
        $scope.companyProfile.CreateSalesConfirmations = false;
        $scope.companyProfile.CreateSalesInvoices = false;

        $scope.r = {
            show : false,
            status: '',
            message: ''
        };

        $scope.companyProfile.PhysicalInventory = 0;
        $scope.companyMaster = {};
        $scope.companyPreference = {};
        $scope.companySubscription = {};
        $scope.tabs = [
            {
                name: 'Master',
                templateUrl: 'views/home/admin/company-profile/tabs/master.html'
            },
            {
                name: 'Preferences',
                templateUrl: 'views/home/admin/company-profile/tabs/preferences.html'
            },
            {
                name: 'Subscription',
                templateUrl: 'views/home/admin/company-profile/tabs/subscription.html'
            },
            {
                name: 'Payments',
                templateUrl: 'views/home/admin/company-profile/tabs/payment-history.html'
            }
        ];

        var successCallback = function() {
            $scope.r.show = true;
            $scope.r.status = 'success';
            $scope.r.message = 'Saved successfully';
        };

        var errorCallback = function() {
            $scope.r.show = true;
            $scope.r.status = 'danger';
            $scope.r.message = 'Error saving data!';
        };
        $scope.btnSave = function () {
            var promise = null;
            var companyProfilePromise = Company.updateCompanyProfile($scope.companyProfile,
                function(){
                    console.log('success');
                },
                function(){
                    console.log('Error Happened while updating company Profile');
                }
            );
            $scope.tabs.forEach(function (obj) {
                if (obj.templateUrl === $scope.contentTemplateUrl) {
                    switch (obj.name) {
                        case 'Master':
                            console.log($scope.companyMaster);
                            promise = Company.updateCompanyMaster($scope.companyMaster,
                                function () {
                                    if($scope.companyMaster.isNew){
                                        $scope.companyMaster.isNew = false;
                                    }
                                    successCallback();
                                }, errorCallback, $scope.companyMaster.isNew);
                            break;
                        case 'Preferences':
                            console.log($scope.companyMaster);
                            promise = Company.updateCompanyPreference($scope.companyPreference,
                                function () {
                                    if($scope.companyPreference.isNew){
                                        $scope.companyPreference.isNew = false;
                                    }
                                    console.log('success');
                                    successCallback();
                                }, errorCallback,$scope.companyPreference.isNew);
                            break;
                        case 'Subscription':
                            console.log($scope.companySubscription);
                            promise = Company.updateSubscriptionComponents($scope.companySubscription,
                                successCallback,errorCallback);
                            break;
                        default:
                            console.log('None selected');
                    }
                }
            });

            return $q.all([promise, companyProfilePromise]);
        };
        $scope.contentTemplateUrl = $scope.tabs[0].templateUrl;
        $scope.addPaymentOption = function () {
            return Company.addPaymentOptions($scope.paymentOptions,
                function success(data) {
                    console.log(JSON.stringify(data));
                    //for (var attrname in data) {
                    //$scope.companyProfile[attrname] = data[attrname];
                    //}
                    //console.log($scope.companyProfile);
                    return data;
                },
                function error(response) {
                    console.log('error resposne:' + JSON.stringify(response));
                });
        };
    });
