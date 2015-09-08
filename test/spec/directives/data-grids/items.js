'use strict';

var objIsEmpty = function(obj) {
	var isEmpty = true;

	angular.forEach(obj, function() {
		isEmpty = false;
	});
	
	return isEmpty;
};

describe('Directive: miItemsDataGrid', function () {

  // load the controller's module
  beforeEach(module('voyagerUiApp'));
  beforeEach(module('mockResources'));
  beforeEach(module('stateMock'));

  var element;
		
	beforeEach(inject(function ($compile, $templateCache, $rootScope, $timeout) {
		$templateCache.put('views/directives/mi-data-grid.html', '<div></div>');
		
		element = $compile(
			'<mi-items-data-grid></mi-items-data-grid>'
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
	
	it('to have a read function which queries Items.query with query params', inject(function(Items) {
		var queryParams = {perpage: 25, page:3};
		spyOn(Items, 'query').andCallThrough();
		
		element.isolateScope().read(queryParams);
		
		expect(Items.query).toHaveBeenCalledWith(queryParams);
	}));
});
