import Integer from './integer';

export default Integer.extend({
  /**************
  /* Attributes
  /**************/

  // Default value
  value: 0,

  // Min value. Should be null if there is no null
  min: null,

  // Max value. Should be null if there is no max
  max: null,

  // On change action uses sendAction to send value after it has been updated by user or by checkValue method
  onChange: null,

  step: 1.00,

  // Number of decimal digits
  precision: 2,

  /**************
  /* Private stuff
  /**************/
  defaultValue: 0.00,
  classNames: ['advanced-form', 'integer', 'plusminus', 'float'],

  /**
   * Because float values are not very precise in javascript we need to work with ints.
   * This function returns value parsed to int
   * @param  {float} value
   * @return {int}
   */
  getValueForCalculations: function(value) {
    return value * Math.pow(10, parseInt(this.get('precision')));
  },

  /**
   * Change int back to float to update the input field
   * @param  {int} value
   * @return {float}
   */
  prepareValueToDisplay: function(value) {
    return parseInt(value) / Math.pow(10, parseInt(this.get('precision')));
  },

    // Check value and update it if conditions do not allow this number
  checkValue: function() {
    var value, min = this.get('min'), max = this.get('max'), setValue = this.get('value');

    value = this.getValueForCalculations(this.get('value'));

    if (max !== null) {
      max = this.getValueForCalculations(this.get('max'));
    }
    if (min !== null) {
      min = this.getValueForCalculations(this.get('min'));
    }

    // If value is NaN it should be set as 0
    if (isNaN(value)) {
      value = this.get('defaultValue');
    }

    // If min is defined and value is less than min it should be set as min
    if (min !== null && value < min) {
        value = min;
    }

    // If max is defined and value is greater than max it should be set as max
    if (max !== null && value > max) {
        value = max;
    }

    // Convert value to string again and compare with original string to check if need to be updated.
    var valueString = this.prepareValueToDisplay(value).toFixed(this.get('precision'));

    if (typeof setValue !== "undefined" && setValue !== null) {
      setValue = setValue.toString();
    }

    // Update value if it was changed by min or max
    if (valueString !== setValue) {
      this.set('value', valueString);
      if (this.get('onChange') !== null) {
        this.sendAction('onChange', valueString);
      }
    }
  },

  actions: {

    // triggered after clicking minus button
    minus: function() {
      var value, step, min;

      value = this.getValueForCalculations(this.get('value'));
      step = this.getValueForCalculations(this.get('step'));
      min = this.get('min');
      if (min !== null) {
        min = this.getValueForCalculations(min);
      }

      // Check if min has been set. If not set is as null because we need it in the next condition
      if (typeof min === "undefined" || min === null || isNaN(min)) {
        min = null;
      }

      // Set value as min if value is less than min
      if (min !== null && value <= min) {
        this.set('value', this.prepareValueToDisplay(min));
        return;
      }

      // Subtract 1 from value
      value = value - step;
      this.set('value', this.prepareValueToDisplay(value));
    },

    // triggered after clicking plus button
    plus: function() {
      var value, step, max;

      value = this.getValueForCalculations(this.get('value'));
      step = this.getValueForCalculations(this.get('step'));
      max = this.get('max');
      if (max !== null) {
        max = this.getValueForCalculations(max);
      }

      // Check if max has been set. If not set is as null because we need it in the next condition
      if (typeof max === "undefined" || max === null || isNaN(max)) {
        max = null;
      }

      // Set value as max if value is greater than max
      if (max !== null && value >= max) {
        this.set('value', this.prepareValueToDisplay(max));
        return;
      }

      // Add 1 to value
      value = value + step;
      this.set('value', this.prepareValueToDisplay(value));
    }
  }
});
