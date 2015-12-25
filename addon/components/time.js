import Ember from 'ember';
import layout from '../templates/components/time';
import InputMixin from '../mixins/input';
import Value from './time/value';

export default Ember.Component.extend(InputMixin, {
  /**************
  /* Attributes
  /**************/

  // Default value
  value: "00:00:00",

  format: "hh:mm:ss",

  toUpdate: "hh",

  /**************
  /* Private stuff
  /**************/
  tagName: 'div',
  layout: layout,
  attributeBindigns: ['value'],
  classNames: ['advanced-forms', 'time', 'plusminus'],
  time: null,

  regexpTest: null,
  regexpMatch: null,

  parts: null,

  init: function() {
    // Reset parts to default state
    var defaultParts = this.getDefaultParts();
    this.updateFormatData(defaultParts);
    this._super();
    this.prepareParts();
  },

  // Observes value and update parts values when there was a change
  valueObserver: function() {
    this.prepareParts();
  }.observes('value'),


  // Updates values if value is value is valid, or set as default
  prepareParts: function() {
    if (Value.checkValue(this.get('value'), this.get('regexpTest'), this.get('regexpMatch'))) {
      var valuesArray = Value.getValueArray(this.get('value'), this.get('regexpMatch'));
      var parts = this.getParts(this.get('value'), valuesArray);
      this.set('parts', parts);
    } else {
      this.set('value', Value.get('default'));
    }
  },

  /**
   * Get parts with values
   * @param  {string} value time value. For example: "10:10:30"
   * @return {object} parts object
   */
  getParts: function(value, valuesArray) {
    var parts = this.get('parts');
    Object.keys(parts).forEach(function(part, index){
      parts[part].value = valuesArray[index];
    });

    return parts;
  },

  update: function(value, toUpdate) {
    var parts = this.get('parts');
    Object.keys(parts).forEach(function(part, index){
      if (part === toUpdate && value > 0) {
        parts = this._addTo(value, index, parts);
      } else if (part === toUpdate && value < 0) {
        parts = this._substractFrom(value, index, parts);
      }
    }.bind(this));

    if (parts !== false) {
      this.set('parts', parts);
    }
  },

  updateFormatData: function(defaultParts) {
    var parts = {};

    var formatRegexp = /([hms]{2})+/g;
    var formatArray = this.get('format').match(formatRegexp);

    var regexpTest = "^";
    var regexpMatch = "^";

    formatArray.forEach(function(partName) {
      regexpTest += defaultParts[partName].regexp + ':';
      regexpMatch += "(" + defaultParts[partName].match + '):';
      parts[partName] = defaultParts[partName];
    });

    regexpTest = regexpTest.substr(0, regexpTest.length - 1) + "$";
    regexpMatch = regexpMatch.substr(0, regexpMatch.length - 1) + "$";

    this.set('regexpTest', new RegExp(regexpTest));
    this.set('regexpMatch', new RegExp(regexpMatch));
    this.set('parts', parts);
  },

  _addTo: function(summand, index, parts) {
    var key = Object.keys(parts)[index];
    if (parts[key].value >= parts[key].max) {

      // Return if it's the last number
      if (index <= 0) {
        return false;
      }
      if ((parts = this._addTo(summand, (index-1), parts)) !== false) {
        parts[key].value = parts[key].min;
        return parts;
      }
      return false;
    }

    if (parts[key].value < parts[key].max) {
      parts[key].value = parseInt(parts[key].value) + parseInt(summand);
      return parts;
    }
  },

  _substractFrom: function(subtrahend, index, parts) {
    var key = Object.keys(parts)[index];
    if (parts[key].value <= parts[key].min) {

      // Return if it's the last number
      if (index <= 0) {
        return false;
      }

      if ((parts = this._substractFrom(subtrahend, (index-1), parts)) !== false) {
        parts[key].value = parts[key].max;
        return parts;
      }
      return false;
    }

    if (parts[key].value > parts[key].min) {
      parts[key].value = parseInt(parts[key].value) + parseInt(subtrahend);
      return parts;
    }
  },

  // Get string from time values stored in parts
  getString: function() {
    var parts = this.get('parts');
    var newValue = "";

    // Iterate throught parts and format every value with leading 0
    Object.keys(parts).forEach(function(key) {
      if (typeof parts[key].value !== "undefined" && parts[key].value !== null) {
        newValue = newValue + "00".substr(0,2-parts[key].value.toString().length) + parts[key].value + ":";
      }
    }.bind(this));
    return newValue.substr(0, newValue.length - 1);
  },

  getDefaultParts: function() {
    return {
      hh: {
        //regexp: "([0-1]?[0-9])|([2][0-3])",
        regexp: "([01]\\d|2[0-3])",
        match: "[0-9]{2}",
        default: "00",
        value: "00",
        max: "23",
        min: "00",
      },
      mm: {
        regexp: "[0-5]?[0-9]",
        match: "[0-9]{2}",
        default: "00",
        value: "00",
        max: "59",
        min: "00",
      },
      ss: {
        regexp: "[0-5]?[0-9]",
        match: "[0-9]{2}",
        default: "00",
        value: "00",
        max: "59",
        min: "00",
      }
    };
  },

  actions: {

    // triggered after clicking minus button
    minus: function() {
      this.update(-1, this.get('toUpdate'));
      this.set('value', this.getString());
    },

    // triggered after clicking plus button
    plus: function() {
      this.update(1, this.get('toUpdate'));
      this.set('value', this.getString());
    }
  }
});
