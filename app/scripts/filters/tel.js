angular.module('voyagerUiApp').filter('tel', function () {
  'use strict';
  return function (tel) {
    if (!tel) {
      return '';
    }
    var value = tel.toString().trim().replace(/^\+/, '');
    console.log(value);
    var tellen = value.length;
    if(value.indexOf('Ext') !== -1) {
      console.log('ok');
      tellen = value.split('Ext')[0].trim().length;
    }

    console.log(value);

    var country, city, number;

    switch (tellen) {
      case 10:
        country = 1;
        city = value.slice(0, 3);
        number = value.slice(3);
        break;

      case 11:
        country = value[0];
        city = value.slice(1, 4);
        number = value.slice(4);
        break;

      case 12:
        country = value.slice(0, 3);
        city = value.slice(3, 5);
        number = value.slice(5);
        break;

      default:
        return tel;
    }

    if (country === 1) {
      country = '';
    }

    number = number.slice(0, 3) + '-' + number.slice(3);

    return (country + ' (' + city + ') ' + number).trim();
  };
});
