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

  // Max values.
  //
  // For example if format is: "hh:mm"
  // Max values should be: "24:59" or any other numbers
  max: null,

  toUpdate: null,

  /**************
  /* Private stuff
  /**************/
  tagName: 'div',
  layout: layout,
  attributeBindigns: ['value'],
  classNames: ['advanced-form', 'time', 'plusminus'],
  time: null,
  _toUpdate: null,

  regexpTest: null,
  regexpMatch: null,

  parts: null,

  init: function() {
    // Reset parts to default state
    var defaultParts = this.getDefaultParts();
    this.updateFormatData(defaultParts);
    this._super();
    this.prepareMaxValues();
    this.prepareParts();

    // Set first part as default to update key
    var partsArray = Object.keys(this.get('parts'));
    this.set('_toUpdate', partsArray[partsArray.length - 1]);

    // if toUpdate value was there use it as update key instead of the default one
    if (this.get('toUpdate') !== null) {
      this.set('_toUpdate', this.get('toUpdate'));
    }
  },

  // Observes value and update parts values when there was a change
  valueObserver: function() {
    this.prepareParts();
  }.observes('value'),

  /**
   * Check if there are some max values set and update them in specific parts.
   */
  prepareMaxValues: function() {
    var maxString = this.get('max');

    if (maxString === null) {
      return;
    }

    var maxArray = maxString.match(this.get('regexpMatch'));
    var parts = this.get('parts');
    Object.keys(parts).forEach(function(part, index) {
      if (typeof maxArray[(index + 1)] !== "undefined") {
        parts[part].max = maxArray[(index + 1)];
      }
    });
  },

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
    var partsChanged = false;

    // Updates parts value attribute from set value
    // If set value is wrong it should correct it. For example set value to max value
    Object.keys(parts).forEach(function(part, index) {
      parts[part].value = valuesArray[index];
      if (parts[part].max !== "--" && parseInt(valuesArray[index]) > parseInt(parts[part].max)) {
        partsChanged = true;
        parts[part].value = parts[part].max;
      }
    });

    // if parts has been changed update value
    if (partsChanged === true) {
      this.set('value', this.getString());
    }

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
    if (parts[key].max !== "--" && parts[key].value >= parts[key].max) {

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

    if (parts[key].max === "--" || parts[key].value < parts[key].max) {
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
        //regexp: "([01]\\d|2[0-3])",
        regexp: "([0-9]+)",
        match: "[0-9\-]+",
        default: "00",
        value: "00",
        max: "23",
        min: "00",
      },
      mm: {
        //regexp: "[0-5]?[0-9]",
        regexp: "([0-9]+)",
        match: "[0-9\-]+",
        default: "00",
        value: "00",
        max: "59",
        min: "00",
      },
      ss: {
        //regexp: "[0-5]?[0-9]",
        regexp: "([0-9]+)",
        match: "[0-9\-]+",
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
      this.update(-1, this.get('_toUpdate'));
      this.set('value', this.getString());
    },

    // triggered after clicking plus button
    plus: function() {
      this.update(1, this.get('_toUpdate'));
      this.set('value', this.getString());
    }
  }
});
