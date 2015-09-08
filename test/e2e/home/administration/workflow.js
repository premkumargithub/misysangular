/**
 * Created by kapil on 9/8/15.
 */
var screenshot = require(process.cwd()+'/test/e2e-libs/screenshot');

describe('Workflow Profile page', function() {
  var closeModal;
  beforeEach(function() {
    var fromHomeToUsers = function() {
      element(by.cssContainingText('section.primary ul.nav-tabs li a', 'Administration')).click();
      element(by.css('section.primary section.main-panel header a.list-icon')).click();
      browser.sleep(750);
      element(by.cssContainingText('section.sidebar div.panel-drop-down ul li div.item-name p', 'Workflow')).click();
    };

    browser.params.loadApp();
    browser.params.login(browser.params.users.admin);
    browser.sleep(800);
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
        expect(browser.getCurrentUrl()).toContain('#/home/admin/workflows/edit/'+resourceid);
      });
    });

    it('updates data on save click', function() {
      var firstGridRow = element(by.css('.administration > div.data-grid-container > div.k-grid div.k-grid-content tbody tr.k-master-row:first-child')),
        lowercaseUserID = 'test';

      firstGridRow.click();

      var workflowName = element(by.cssContainingText('.primary-fields .text label', 'Workflow Name')).
        element(by.xpath('..')).
        $('.edit input');
      workflowName.clear().then(function(){
        workflowName.sendKeys(lowercaseUserID);
      });

      var saveBtn = $('header.panel-heading .controls button[mi-button-text="Save"]');
      saveBtn.click();
      var el = $('.administration > div.data-grid-container > div.k-grid div.k-grid-content tbody tr.k-master-row:first-child td:nth-child(3)');
      browser.sleep(800);
      expect(el.getText()).toEqual(lowercaseUserID);
    });

    it('should be able to add new security-profile', function() {

      var total = 0;
      $$('.administration > div.data-grid-container > div.k-grid div.k-grid-content tbody tr.k-master-row').
        then(function(elementCollection){
          total = elementCollection.length;
        });

      $('.search .add-filter-wrap .add-filter').click();
      expect(browser.getCurrentUrl()).toContain('/home/admin/workflows/add/');

      var workflowId = element(by.cssContainingText('.primary-fields .text label', 'Workflow ID')).
        element(by.xpath('..')).
        $('.edit input');

      var random =(new Date%9e6).toString(36);
      workflowId.clear().then(function(){
        workflowId.sendKeys(random);
      });

      var workflowName = element(by.cssContainingText('.primary-fields .text label', 'Workflow Name')).
        element(by.xpath('..')).
        $('.edit input');
      var testText = 'Test Profile Name';
      workflowName.clear().then(function(){
        workflowName.sendKeys(testText);
      });

      $('header .controls button[mi-button-text="Save"]').click();

      browser.sleep(800);

      $$('.administration > div.data-grid-container > div.k-grid div.k-grid-content tbody tr.k-master-row').
        then(function(elementCollection){
          expect(elementCollection.length).toEqual(total + 1);
        });
    });

    it('should delete the rows', function(){
      var total = 0;
      $$('.administration > div.data-grid-container > div.k-grid div.k-grid-content tbody tr.k-master-row').
        then(function(elementCollection){
          total = elementCollection.length;
          elementCollection[0].click();
          $('header .controls button[mi-button-text="Delete"]').click();
          browser.sleep(800);
        });


      $$('.administration > div.data-grid-container > div.k-grid div.k-grid-content tbody tr.k-master-row').
        then(function(elementCollection){
          expect(elementCollection.length).toEqual(total - 1);
        });
    });

  });

  afterEach(function() {
    screenshot.takeScreenshot(jasmine.getEnv().currentSpec, '/home/administration/users');
    browser.params.logout(closeModal);
  });
});