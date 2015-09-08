'use strict';

var objIsEmpty = function(obj) {
	var isEmpty = true;

	angular.forEach(obj, function() {
		isEmpty = false;
	});
	
	return isEmpty;
};

describe('Directive: miUsersDataGrid', function () {

  // load the controller's module
  beforeEach(module('voyagerUiApp'));
  beforeEach(module('mockResources'));
  beforeEach(module('stateMock'));

  var element;
		
	beforeEach(inject(function ($compile, $templateCache, $rootScope, $timeout) {
		$templateCache.put('views/directives/mi-data-grid.html', '<div></div>');
		
		element = $compile(
			'<mi-users-data-grid></mi-users-data-grid>'
		)($rootScope.$new());
		
		$timeout.flush();
		$rootScope.$apply();
	}));
	
	it('has a columns object', function() {
		expect(element.isolateScope().columns).toBeDefined();
		expect(typeof element.isolateScope().columns).toBe('object');
	});
	
	it('has id, field, and title properties for each column, and a final empty column', function() {
		angular.forEach(element.isolateScope().columns, function(obj, index) {
			if(index < element.isolateScope().columns.length-1) {
				expect(obj.id).toBeDefined();
				expect(obj.field).toBeDefined();
				expect(obj.title).toBeDefined();
				expect(obj.id).toEqual(obj.field);
			} else {
				expect(objIsEmpty(obj)).toBe(true);
			}
		});
	});
	
	it('to have a read function which queries UsersService.query with query params', inject(function(UsersService) {
		var queryParams = {perpage: 25, page:3};
		spyOn(UsersService, 'query').andCallThrough();
		
		element.isolateScope().read(queryParams);
		
		expect(UsersService.query).toHaveBeenCalledWith(queryParams);
	}));
});
