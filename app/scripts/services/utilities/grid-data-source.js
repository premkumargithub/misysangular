/*global kendo*/

angular.module('voyagerUiApp').factory('GridDataSource',
	function() {
		'use strict';
		
		return {
			get: function(crud, modelFields) {
				var total, transport;
				total = 0;
				
				transport = {};
				//Defined read function
				if(angular.isDefined(crud.read)) {
					transport.read = function(options) {
						crud.read({
							params: {
								perpage: options.data.pageSize,
								page: options.data.page
							}
						}).then(function(response) {
							if(angular.isDefined(response.headers()['x-total-count'])) {
								total = response.headers()['x-total-count'];
							} else {
								total = response.data.length;
							}
							options.success(response.data);
						}).catch(function(response) {
							options.error(response);
						});
					};
				}
				
				//Define editing functions, throws error if one call is defined but not all of them
				//This is based on the assumption that if any editing functionality is desired, all of it is
				if(angular.isDefined(crud.create) && angular.isDefined(crud.update) && angular.isDefined(crud.destroy)) {
					transport.create = function(options) {
						crud.create({
							params: {},
							data: options.data
						}).then(function(response) {
							options.success(response.data);
						}).catch(function(response) {
							options.error(response);
						});
					};
					transport.update = function(options) {
						crud.update({
							params: {},
							data: options.data
						}).then(function(response) {
							options.success(response.data);
						}).catch(function(response) {
							options.error(response);
						});
					};
					transport.destroy = function(options) {
						crud.destroy({
							params: options.data,
							data: options.data
						}).then(function(response) {
							options.success(response.data);
						}).catch(function(response) {
							options.error(response);
						});
					};
				} else {
					if(angular.isDefined(crud.create) || angular.isDefined(crud.update) || angular.isDefined(crud.destroy)) {
						throw 'Editable DataGridDataSources can only be defined if create, update, and destroy calls are defined.';
					}
				}
			
				return new kendo.data.DataSource({
					pageSize: 25,
					serverPaging: true,
					schema: {
						model: {
							id: 'ResourceID',
							fields: modelFields
						},
						total: function() { return total; }
					},
					transport: transport
				});
			}
		};
	});