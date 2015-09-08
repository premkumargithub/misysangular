var screenshot = require(process.cwd()+'/test/e2e-libs/screenshot');

describe('Users page', function() {
  var closeModal;
  beforeEach(function() {
    var fromHomeToUsers = function() {
      element(by.cssContainingText('section.primary ul.nav-tabs li a', 'Administration')).click();
      element(by.css('section.primary section.main-panel header a.list-icon')).click();
      browser.sleep(750);
      element(by.cssContainingText('section.sidebar div.panel-drop-down ul li div.item-name p', 'Users')).click();
    };
    
    browser.params.loadApp();
    browser.params.login(browser.params.users.admin);
    fromHomeToUsers();
    
    closeModal = false;
  });
  
  describe('grid', function() {
    it('is displayed', function() {
      expect(element(by.css('div.k-grid')).isDisplayed()).toBe(true);
    });
    
    it('navigates to the details page when a row is clicked', function() {
      var firstGridRow = element(by.css('.administration > div.data-grid-container > div.k-grid div.k-grid-content tbody tr.k-master-row:first-child'));
      firstGridRow.click();
      firstGridRow.getAttribute('data-mi-resource-id').then(function(resourceid) {
        expect(browser.getCurrentUrl()).toContain('#/home/admin/users/edit/'+resourceid);
      });
    });
  });
  
  describe('details page', function() {
    it('changes User ID value to uppercase', function() {
      var firstGridRow = element(by.css('.administration > div.data-grid-container > div.k-grid div.k-grid-content tbody tr.k-master-row:first-child')),
        lowercaseUserID = 'test',
        userIdField;
      
      firstGridRow.click();
      
      userIdField = element(by.name('resourcesuserpropertiesid')),
      userIdField.clear().then(function() {
        userIdField.sendKeys(lowercaseUserID);
        expect(userIdField.getAttribute('value')).toBe(lowercaseUserID.toUpperCase());
      });
      
      closeModal = true;
    });
  });
  
  afterEach(function() {
    screenshot.takeScreenshot(jasmine.getEnv().currentSpec, '/home/administration/users');
    browser.params.logout(closeModal);
  });
});