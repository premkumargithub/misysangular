angular.module('mi-angular-lib.administration.company').factory('CompanyValidation',
	function(Validators) {
		'use strict';

		return {
			CompanyID: [
				new Validators.Required()
			],
			CompanyName: [
				new Validators.Required()
			],
			Address: [
				new Validators.Required()
			],
			City: [
				new Validators.Required()
			],
			State: [
				new Validators.Required()
			],
			Zip: [
				new Validators.Required()
			],
			Country: [
				new Validators.Required()
			],
			CompanyUrl: [
				new Validators.Required()
			],
			NAICS: [
			],
			ContactName: [
				new Validators.Required()
			],
			ContactTitle: [
				new Validators.Required()
			],
			Phone: [
				new Validators.Required()
			],
			Email: [
				new Validators.Required(),
				new Validators.Email()
			],
			ContactEmail: [
				new Validators.Required(),
				new Validators.Email()
			],
			NextBillingAmount: [
				new Validators.Required()
			],
			NextBillingDate: [
				new Validators.Required()
			],
			NumberOfUsers: [
				new Validators.Required()
			],
		};
	});


