angular.module('voyagerUiApp').controller('DashboardCtrl',
	function($scope) {
		'use strict';
	
		$scope.sales = [
			{label:'item1', value: 12.5, color:'#2393C5'},
			{label:'item2', value: 87.5, color:'#6197c8'}
		];
		$scope.purchasing = [
			{label:'item1', value: 12.5, color:'#5FB657'},
			{label:'item2', value: 29, color:'#ABC540'},
			{label:'item3', value: 46, color:'#F0C02E'},
			{label:'item4', value: 12.5, color:'#DC521A'}
		];
		$scope.production = [
			{label:'item1', value: 17.5, color:'#5FB657'},
			{label:'item2', value: 52, color:'#ABC540'},
			{label:'item3', value: 24, color:'#F0C02E'},
			{label:'item4', value: 6.5, color:'#DC521A'}
		];
		$scope.inventoryControl = [
			{label:'item1', value: 12.5, color:'#5FB657'},
			{label:'item2', value: 29, color:'#ABC540'},
			{label:'item3', value: 46, color:'#F0C02E'},
			{label:'item4', value: 12.5, color:'#DC521A'}
		];
	});