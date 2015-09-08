
var screenshot = require(process.cwd()+'/test/e2e-libs/screenshot');

describe('Company Profile Page', function() {
  var closeModal;
  beforeEach(function() {
    var fromHomeToUsers = function() {
      element(by.cssContainingText('section.primary ul.nav-tabs li a', 'Administration')).click();
      element(by.css('section.primary section.main-panel header a.list-icon')).click();
      browser.sleep(750);
      element(by.cssContainingText('section.sidebar div.panel-drop-down ul li div.item-name p', 'Company Profile')).click();
    };

    browser.params.loadApp();
    browser.params.login(browser.params.users.admin);
    browser.sleep(800);
    fromHomeToUsers();

    closeModal = false;
  });

  describe('Master Tab', function() {
    it('should make call to api and display data in fields', function() {
      var element = $("input[name='resourcescompanycompanyprofilepropertiescontactname']");
      var name = element.getAttribute('value');
      expect(name).not.toBe(null);
    });

    it('should update value by api call', function(){
      var elem = element(by.name('resourcescompanycompanyprofilepropertiesaddress1'));
      elem.clear();
      elem.sendKeys('Address for testing');

      var saveBtn = $('header.panel-heading .controls button[mi-button-text="Save"]');
      saveBtn.click();

      element(by.repeater('tab in tabsList').row(1)).click();
      element(by.repeater('tab in tabsList').row(0)).click();

      expect(elem.getAttribute('value')).toEqual('Address for testing');
    });

    it('should make primary address readonly if "same as administrative" checked', function(){

      var legendText = 'Primary Billing Contact';
      var legends = $$('legend').filter(function(el, index){
        return el.getText().then(function(text){
          return text === legendText;
        });
      });
      legends.then(function(filterElements){
        var check = filterElements[0].element(by.xpath('..')).$('.checkbox label input[type="checkbox"]');
        check.isSelected().then(function(selected){
          if(!selected) {
            check.click();
          }
        });
      });
      legends.then(function(filterElements){
        var inputel = filterElements[0].
          element(by.xpath('..')).
          element(by.cssContainingText('.text label', 'Name')).
          element(by.xpath('..')).
          $('.edit input');
        inputel.getAttribute('readonly').then(function(val){
          expect(val).not.toBe(null);
        });
      });


    });

    it('should make secondry address readonly if "same as primary" checked', function(){

      var legendText = 'Secondary Billing Contact';
      $$('legend').filter(function(el, index){
        return el.getText().then(function(text){
          return text === legendText;
        });
      }).then(function(filterElements){
        var check = filterElements[0].element(by.xpath('..')).$('.checkbox label input[type="checkbox"]');
        check.isSelected().then(function(selected){
          if(!selected) {
            check.click();
          }
        });
      });
      $$('legend').filter(function(el, index){
        return el.getText().then(function(text){
          return text === legendText;
        });
      }).then(function(filterElements){
        var inputel = filterElements[0].
          element(by.xpath('..')).
          element(by.cssContainingText('.text label', 'Name')).
          element(by.xpath('..')).
          $('.edit input');
        inputel.getAttribute('readonly').then(function(val){
          expect(val).not.toBe(null);
        });
      });


    });



    it('should fill same values in primary address as administrative if same checked', function(){
      var legendText = 'Primary Billing Contact';
      $$('legend').filter(function(el, index){
        return el.getText().then(function(text){
          return text === legendText;
        });
      }).then(function(filterElements){
        var check = filterElements[0].element(by.xpath('..')).$('.checkbox label input[type="checkbox"]');
        check.isSelected().then(function(selected){
          if(!selected) {
            check.click();
          }
        });
      });

      $$('legend').filter(function(el, index){
        return el.getText().then(function(text){
          return text === 'Administrative Contact';
        });
      }).then(function(filterElements){
        var inputel = filterElements[0].element(by.xpath('..')).$('.text:nth-child(1) .edit input');
        inputel.clear().then(function(){
          inputel.sendKeys('Test');
        });
      });
      browser.sleep(300);
      $$('legend').filter(function(el, index){
        return el.getText().then(function(text){
          return text === legendText;
        });
      }).then(function(filterElements){
        var inputel = filterElements[0].
          element(by.xpath('..')).
          element(by.cssContainingText('.text label', 'Name')).
          element(by.xpath('..')).
          $('.edit input');
        inputel.getAttribute('value').then(function(val){
          expect(val).toEqual('Test');
        });
      });
    });


    it('should fill same values in secondry address as primary if same checked', function(){
      $$('legend').filter(function(el, index){
        return el.getText().then(function(text){
          return text === 'Primary Billing Contact';
        });
      }).then(function(filterElements){
        var check = filterElements[0].element(by.xpath('..')).$('.checkbox label input[type="checkbox"]');
        check.isSelected().then(function(selected){
          if(selected) {
            check.click();
          }
        });
      });

      var legendText = 'Secondary Billing Contact';
      $$('legend').filter(function(el, index){
        return el.getText().then(function(text){
          return text === legendText;
        });
      }).then(function(filterElements){
        var check = filterElements[0].element(by.xpath('..')).$('.checkbox label input[type="checkbox"]');
        check.isSelected().then(function(selected){
          if(!selected) {
            check.click();
          }
        });
      });

      $$('legend').filter(function(el, index){
        return el.getText().then(function(text){
          return text === 'Primary Billing Contact';
        });
      }).then(function(filterElements){
        var inputel = filterElements[0].
          element(by.xpath('..')).
          element(by.cssContainingText('.text label', 'Name')).
          element(by.xpath('..')).
          $('.edit input');
        inputel.clear().then(function(){
          inputel.sendKeys('Test');
        });
      });
      browser.sleep(300);
      $$('legend').filter(function(el, index){
        return el.getText().then(function(text){
          return text === legendText;
        });
      }).then(function(filterElements){
        var inputel = filterElements[0].
          element(by.xpath('..')).
          element(by.cssContainingText('.text label', 'Name')).
          element(by.xpath('..')).
          $('.edit input');
          inputel.getAttribute('value').then(function(val){
            expect(val).toEqual('Test');
          });
      });
    });
  });

  describe('Preferences Tab', function() {
    it('should make call to api and display data in fields', function() {
      element(by.repeater('tab in tabsList').row(1)).click();
      var elem = $('div[ng-model="companyPreference.AccountingCostingMethod"] select option:checked');
      var name = elem.getText();
      expect(name).not.toBe(null);
    });

    it('should update value by api call', function(){
      element(by.repeater('tab in tabsList').row(1)).click();

      var check = $('div[mi-field-property="Resources.Company.CompanyProfile.Preferences.Sales.CreateSalesEstimates"] input[type="checkbox"]:first-child');
      check.click();

      var checkVal = check.isSelected();
      var saveBtn = $('header.panel-heading .controls button[mi-button-text="Save"]');
      saveBtn.click();

      element(by.cssContainingText('section.sidebar div.panel-drop-down ul li div.item-name p', 'Security Profile')).click();
      browser.sleep(2000);
      element(by.cssContainingText('section.sidebar div.panel-drop-down ul li div.item-name p', 'Company Profile')).click();
      browser.sleep(800);
      element(by.repeater('tab in tabsList').row(1)).click();
      var checkNew = $('div[mi-field-property="Resources.Company.CompanyProfile.Preferences.Sales.CreateSalesEstimates"] input[type="checkbox"]:first-child');

      checkNew.isSelected().then(function(selected){
        expect(selected).toEqual(checkVal);
      });
    });
  });

  afterEach(function() {
    screenshot.takeScreenshot(jasmine.getEnv().currentSpec, '/home/administration/users');
    browser.params.logout(closeModal);
  });
});