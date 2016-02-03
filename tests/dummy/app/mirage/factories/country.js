// app/mirage/factories/user.js
import Mirage from 'ember-cli-mirage';

var countriesList = [
  { id: 1, name: 'Poland', code: 'PL' },
  { id: 2, name: 'United Kingdom', code: 'GB', checked: true },
  { id: 3, name: 'United States', code: 'US' },
  { id: 4, name: 'France', code: 'FR', checked: true },
  { id: 5, name: 'Germany', code: 'DE' },
  { id: 6, name: 'Ireland', code: 'IE' }
];

export default Mirage.Factory.extend({
  name(i) { return countriesList[i].name; },
  code(i) { return countriesList[i].code; },
  checked(i) { return countriesList[i].checked; },
});
