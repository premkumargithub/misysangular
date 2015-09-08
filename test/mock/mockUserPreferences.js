var mod = angular.module('mockUserPreferences', []);
mod.service('UserPreferences', function() {
	return {
		get: function() {
			return {
				DecimalPrecision: {
					Quantity: 1,
					UnitCost: 2,
					ExtendedCost: 3
				}
			};
		}
	};
});