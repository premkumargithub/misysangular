var mod = angular.module('mockValidationResources', []);
mod.service('validationResources', function() {
	return {
		get: function() {
			return {
				'Inputs': {
					'Checkbox': {
					},
					'Email': {
						'Pattern': '/\\w+([\\.\\-]?\\w+)*@\\w+([\\.\\-]?\\w+)*(\\.\\w{2,3})+$/'
					},
					'Password': {
						'Pattern': '/^(?=[0-9a-zA-Z]*[!@#$%&+?*])(?=[a-zA-Z!@#$%&+?]*\\d)(?=[0-9A-Z!@#$%&+?]*[a-z])(?=[0-9a-z!@#$%&+?]*[A-Z])[0-9a-zA-Z!@#$%&+?]{8,}$/' 
					}
				},
				'Resources': {
					'RecoveryValues': {
						'Properties': {
							'AuthCode': {
								'Maxlength': 36
							}
						}
					}
				}
			};
		}
	};
});
