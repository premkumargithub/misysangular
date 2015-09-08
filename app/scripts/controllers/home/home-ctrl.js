angular.module('voyagerUiApp').controller('HomeCtrl',
	function(ActiveApplicationMode, ApplicationModes, companyName, resources, $rootScope, $scope, Session, $state, userName) {
		'use strict';

		//Application Modes
		$scope.appModeIsTrial = function() {
			var companyID = Session.getSessionData().companyID,
				isTrial = false;

			//This null check only serves to prevent TypeErrors in the console
			if (companyID !== null) {
				if (companyID.toUpperCase() === 'mitrialco'.toUpperCase()) {
					isTrial = true;
				}
			}

			return isTrial;
		};
		$scope.appModeIsTest = function() {
			return ActiveApplicationMode.get().value === ApplicationModes.get().Test.value;
		};

		$scope.companyName = companyName;
		$scope.userName = userName;

		$scope.$on('SessionUserChange', function(e, args) {
			$scope.userName = args.data.Name;
		});
		
		$scope.$on('CompanyProfileChange', function(e, args) {
			$scope.companyName = args.CompanyName;
		});

		$scope.$on('SubscriptionComponentsChange', function(e, args) {
			$scope.subscriptionComponents = args;
		});
		
		$scope.toggleSidebar = function() {
			$rootScope.$broadcast('ToggleSidebar');
		};

		//Generate breadcrumbs based on the dot notation of states, and getBreadCrumbName property
		$scope.getCrumbs = function() {
			var ancestorState, ancestorStateName = $state.current.name,
				crumbsWip = [];

			while (ancestorStateName !== 'base') {
				ancestorState = $state.get(ancestorStateName);

				if (ancestorState.hasOwnProperty('getBreadCrumbName')) {
					crumbsWip.unshift({
						state: ancestorStateName,
						title: ancestorState.getBreadCrumbName($scope.resourcesObj)
					});
				}

				ancestorStateName = ancestorStateName.substr(0, ancestorStateName.lastIndexOf('.'));
			}

			return crumbsWip;
		};

		//Evaluate Add New Button Function
		$scope.getAddNewState = function() {
			var addNewState, newStates;

			addNewState = null;
			newStates = {
				'base.home.admin.users': 'base.home.admin.users.selection',
				'base.home.admin.departments': 'base.home.admin.departments.selection',
				'base.home.admin.securityProfiles': 'base.home.admin.securityProfiles.selection',
				'base.home.admin.workflows': 'base.home.admin.workflows.selection',
				'base.home.admin.security-groups': 'base.home.admin.security-groups.selection',
				'base.home.master-files.items': 'base.home.master-files.items.selection',
				'base.home.master-files.jobs': 'base.home.master-files.jobs.selection',
				'base.home.master-files.locations': 'base.home.master-files.locations.selection',
				'base.home.master-files.suppliers': 'base.home.master-files.suppliers.selection'
			};

			//Check if current state is included in the given parent state
			angular.forEach(newStates, function(newState, ancestorStateName) {
				if ($state.includes(ancestorStateName)) {
					addNewState = newState;
				}
			});

			return addNewState;
		};

		$scope.goToAddNewState = function() {
			$state.go($scope.addNewState, {
				mode: 'add',
				ResourceID: ''
			});
		};

		//Get breadcrumbs and add new states on state transitions
		$scope.crumbs = $scope.getCrumbs();
		$scope.addNewState = $scope.getAddNewState();
		$scope.$on('$stateChangeSuccess', function() {
			$scope.crumbs = $scope.getCrumbs();
			$scope.addNewState = $scope.getAddNewState();
		});
	});
