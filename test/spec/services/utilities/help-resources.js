'use strict';

describe('Service: helpResources', function () {

  // load the service's module
  beforeEach(module('voyagerUiApp'));

  // instantiate service
  var helpResources;
  beforeEach(inject(function (_helpResources_) {
    helpResources = _helpResources_;
  }));

  it('should do something', function () {
    expect(!!helpResources).toBe(true);
  });

});
