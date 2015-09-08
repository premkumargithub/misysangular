var screenshot = require(process.cwd()+'/test/e2e-libs/screenshot');

describe('Items page', function() {
	beforeEach(function() {
		var fromHomeToItems = function() {
			element(by.cssContainingText('section.primary ul.nav-tabs li a', 'Master Files')).click();
			element(by.css('section.primary section.main-panel header a.list-icon')).click();
			browser.sleep(750);
			element(by.cssContainingText('section.sidebar div.panel-drop-down ul li div.item-name p', 'Items')).click();
		};
		
		browser.params.loadApp();
		browser.params.login(browser.params.users.admin);
		fromHomeToItems();
	});
	
	it('displays a table of items', function() {
		expect(element(by.css('div.k-grid')).isDisplayed()).toBe(true);
	});
	
	it('displays 25 items', function() {
		element.all(by.css('div.k-grid div.k-grid-content tbody tr.k-master-row')).then(function(rows) {
			expect(rows.length).toBe(25);
		});
	});
	
	it('goes to a details page when a row is clicked', function() {
		var firstGridRow = element(by.css('div.k-grid div.k-grid-content tbody tr.k-master-row:first-child'));
		firstGridRow.click();
		firstGridRow.getAttribute('data-mi-resource-id').then(function(resourceid) {
			expect(browser.getCurrentUrl()).toContain('#/home/master-files/items/edit/'+resourceid);
		});
	});
	
	afterEach(function() {
		screenshot.takeScreenshot(jasmine.getEnv().currentSpec, '/home/master-files/items');
		browser.params.logout();
	});
});