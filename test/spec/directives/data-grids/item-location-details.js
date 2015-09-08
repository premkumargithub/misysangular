'use strict';

describe('Directive: miItemLocationDetailsDataGrid', function () {

  // load the controller's module
  beforeEach(module('voyagerUiApp'));
  beforeEach(module('mockResources'));
  beforeEach(module('stateMock'));

  var element, scope;
		
	beforeEach(inject(function ($compile, $templateCache, $rootScope, $timeout) {
		$templateCache.put('views/directives/mi-data-grid.html', '<div></div>');
		
		scope = $rootScope.$new();
		scope.ItemResourceID = 'abc-123';
		element = $compile(
			'<mi-item-location-details-data-grid '+
				'item-resource-id="ItemResourceID"'+
			'></mi-item-location-details-data-grid>'
		)(scope);
		
		$timeout.flush();
		$rootScope.$apply();
	}));
	
	it('has a columns object', function() {
		expect(element.isolateScope().properties).toBeDefined();
		expect(typeof element.isolateScope().properties).toBe('object');
	});
	
	it('has id, field, and title properties for each column, and a final empty column', function() {
		angular.forEach(element.isolateScope().properties, function(obj) {
			if(angular.isDefined(obj.columnConfig)) {
				expect(obj.id).toBeDefined();
				expect(obj.columnConfig.field).toBeDefined();
				expect(obj.columnConfig.title).toBeDefined();
				expect(obj.id).toEqual(obj.columnConfig.field);
			}
		});
	});
	
	it('to have a read function which queries ItemLocationDetails.query with jobResourceId from attributes', inject(function(ItemLocationDetails) {
		var queryParams = {perpage: 25, page:3};
		spyOn(ItemLocationDetails, 'query').andCallThrough();
		
		element.isolateScope().read(queryParams);
		
		expect(ItemLocationDetails.query).toHaveBeenCalledWith(element.isolateScope().itemResourceId, queryParams);
	}));
});
