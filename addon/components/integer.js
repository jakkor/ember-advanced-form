import Ember from 'ember';
import layout from '../templates/components/integer';
import InputMixin from '../mixins/input';

export default Ember.Component.extend(InputMixin, {
  /**************
  /* Attributes
  /**************/

  // Default value
  value: 0,

  // Min value. Should be null if there is no null
  min: null,

  // Max value. Should be null if there is no max
  max: null,

  /**************
  /* Private stuff
  /**************/
  tagName: 'div',
  layout: layout,
  attributeBindigns: ['value'],
  classNames: ['advanced-forms', 'integer', 'plusminus'],

  // Value observer. Run check value if value has been changed in any way
  valueObserver: function() {
    this.checkValue();
  }.observes('value').on('init'),

  // Check value and update it if conditions do not allow this number
  checkValue: function() {

    // Convert min, max and value to int
    var value = parseInt(this.get('value'));
    var min = parseInt(this.get('min'));
    var max = parseInt(this.get('max'));

    // If value is NaN it should be set as 0
    if (isNaN(value)) {
      value = 0;
    }

    // If min is defined and value is less than min it should be set as min
    if (typeof min !== "undefined" && min !== null && !isNaN(min) && value < min) {
        value = min;
    }

    // If max is defined and value is greater than max it should be set as max
    if (typeof max !== "undefined" && max !== null && !isNaN(max) && value > max) {
        value = max;
    }

    // Convert value to string again and compare with original string to check if need to be updated.
    var valueString = value.toString();
    if (valueString !== this.get('value')) {
      this.set('value', valueString);
    }
  },

  actions: {

    // triggered after clicking minus button
    minus: function() {
      var value = parseInt(this.get('value'));
      var min = parseInt(this.get('min'));

      // Check if min has been set. If not set is as null because we need it in the next condition
      if (typeof min === "undefined" || min === null || isNaN(min)) {
        min = null;
      }

      // Set value as min if value is less than min
      if (min !== null && value <= min) {
        this.set('value', min);
        return;
      }

      // Subtract 1 from value
      value--;
      this.set('value', value);
    },

    // triggered after clicking plus button
    plus: function() {
      var value = parseInt(this.get('value'));
      var max = parseInt(this.get('max'));

      // Check if max has been set. If not set is as null because we need it in the next condition
      if (typeof max === "undefined" || max === null || isNaN(max)) {
        max = null;
      }

      // Set value as max if value is greater than max
      if (max !== null && value >= max) {
        this.set('value', max);
        return;
      }

      // Add 1 to value
      value++;
      this.set('value', value);
    }
  }
});
