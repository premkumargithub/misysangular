'use strict';

var objIsEmpty = function(obj) {
	var isEmpty = true;

	angular.forEach(obj, function() {
		isEmpty = false;
	});
	
	return isEmpty;
};

describe('Directive: miLocationItemsDataGrid', function () {

  // load the controller's module
  beforeEach(module('voyagerUiApp'));
  beforeEach(module('mockResources'));
  beforeEach(module('stateMock'));

  var element, scope;
		
	beforeEach(inject(function ($compile, $templateCache, $rootScope, $timeout) {
		$templateCache.put('views/directives/mi-data-grid.html', '<div></div>');
		
		scope = $rootScope.$new();
		scope.LocationResourceID = 'abc-123';
		element = $compile(
			'<mi-location-items-data-grid '+
				'location-resource-id="LocationResourceID"'+
			'></mi-location-items-data-grid>'
		)(scope);
		
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
	
	it('to have a read function which queries Locations.getLocationItems with location ResourceID and query params', inject(function(Locations) {
		var queryParams = {perpage: 25, page:3};
		spyOn(Locations, 'getLocationItems').andCallThrough();
		
		element.isolateScope().read(queryParams);
		
		expect(Locations.getLocationItems).toHaveBeenCalledWith(element.isolateScope().locationResourceId, queryParams);
	}));
});