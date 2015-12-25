import Ember from 'ember';

export default Ember.Object.create({

  default: "00:00:00",

  /**
   * Check if value is valid
   * @param  {string} value       value from the input field
   * @param  {object} regexpTest  regexp to test if value is valid
   * @param  {object} regexpMatch regexp to mach values from value string
   * @return {bool}
   */
  checkValue: function(value, regexpTest, regexpMatch) {
    if (regexpTest === null || regexpMatch === null) {
      return false;
    }
    if (regexpTest.test(value) === false) {
      return false;
    }
    return true;
  },

  /**
   * Get values array
   * @param  {string} value       value from the input field
   * @param  {object} regexpMatch regexp object to match values
   * @return {array}              array with values
   */
  getValueArray: function(value, regexpMatch) {
    var valueArray = value.match(regexpMatch);
    valueArray.shift();
    return valueArray;
  },

});
