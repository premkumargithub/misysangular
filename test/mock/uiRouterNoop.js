// uiRouterNoop.js helper module
var mod = angular.module('uiRouterNoop', []);
mod.service('$state', function() {
	return {
		current:{
			name:'base'
		},
		get:function(){
			return {
				name:'base'
			};
		},
		go:function(){return {};},
		includes:angular.noop,
		params:''
	};
});
mod.service('$urlRouter', function() {
	return {};
});