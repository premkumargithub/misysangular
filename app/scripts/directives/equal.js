angular.module('voyagerUiApp')
  .directive('equal', [function () {
		'use strict';
	
    return {
      require: 'ngModel',
      scope: {
        equal:'='
      },
			restrict:'A',
      link: function (scope, elem, attrs, ctrl) {
        //Set validity of this directive
        var setValidity = function(str1, str2){
          if(str1 === str2){
            ctrl.$setValidity('equal', true);
          }else{
						//If neither value is set, count them as valid
						if(!str1 && !str2){
							ctrl.$setValidity('equal', true);
						} else {
							ctrl.$setValidity('equal', false);
						}
          }
        };
        
        //Watch this input's value
        scope.$watch(function(){
          return ctrl.$viewValue;
        }, function(viewValue){
          setValidity(scope.equal, viewValue);
        });
        
        //Watch the other input's value
        scope.$watch('equal', function(){
          setValidity(scope.equal, ctrl.$viewValue);
        });
      }
    };
  }]);