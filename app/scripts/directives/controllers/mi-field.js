angular.module('voyagerUiApp').controller('MiFieldCtrl',
	function($scope, resources, validationResources) {
		'use strict';

		var capitalizeFirstLetter = function(string) {
			return string.charAt(0).toUpperCase() + string.slice(1);
		};

		$scope.getDisplayText = function(propertyStr) {
			return $scope.getResourcesProperties(propertyStr).DisplayText;
		};

		$scope.getName = function(propertyStr) {
			var fieldName = '';

			if (angular.isDefined(propertyStr)) {
				fieldName = propertyStr.replace(/\./g, '').toLowerCase();
			}

			return fieldName;
		};

		$scope.getPropertyName = function(propertyStr) {
			return propertyStr.substr(propertyStr.lastIndexOf('.') + 1);
		};

		//Gets DisplayText and Options, if available
		$scope.getResourcesProperties = function(propertyStr) {
			var resource = {};

			if (angular.isDefined(propertyStr)) {
				resource = resources.getPropertyByString(propertyStr);
			} else {
				resource.DisplayText = '';
			}

			return resource;
		};

		//Get object containing layered validation properties according to validationResources
		$scope.getValidationProperties = function(inputType, propertyStr) {
			return angular.extend({},
				validationResources.getPropertyByString('Inputs.' + capitalizeFirstLetter(inputType)),
				validationResources.getPropertyByString(propertyStr)
			);
		};

		//Convert validationProperties to an html string of attributes
		$scope.getValidationAttributes = function(inputType, propertyStr) {
			var property, properties, validationAttrsMapping, validationAttrsWip;

			properties = $scope.getValidationProperties(inputType, propertyStr);
			validationAttrsMapping = {
				'Capitalized': 'capitalize',
				'Maxlength': 'maxlength',
				'Pattern': 'ng-pattern'
			};
			validationAttrsWip = '';

			for (property in properties) {
				if (properties.hasOwnProperty(property) && validationAttrsMapping.hasOwnProperty(property)) {
					validationAttrsWip += ' ';
					validationAttrsWip += validationAttrsMapping[property];
					validationAttrsWip += '=';
					validationAttrsWip += '"' + properties[property] + '"';
				}
			}

			return validationAttrsWip + ' ';
		};

	});
