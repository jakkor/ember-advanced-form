import Ember from 'ember';
import layout from '../templates/components/multi-select';

export default Ember.Component.extend({
  /**************
  /* Attributes
  /**************/

  // If select list is active
  isActive: false,

  // Placeholder when nothing is selected
  placeHolder: '--------',

  // What is the name of label field
  mapLabel: 'label',

  // What is the name of the id field
  mapID: 'id',

  // What is the name of checked field
  mapChecked: 'checked',

  // Array of object for the drop down field
  list: [],

  // On change action uses sendAction to send value after it has been updated by user or by checkValue method
  onChange: null,

  /**************
  /* Private stuff
  /**************/
  tagName: 'div',
  layout: layout,
  classNames: ['advanced-form', 'multi-select'],
  classNameBindings: ['isActive:active'],
  selectedValue: null,

  /**
   * After clicking the element list will show or hide
   */
  click: function() {
    if (this.get('isActive') === false) {
      this.set('isActive', true);
      return;
    }
    this.set('isActive', false);
  },

  actions: {
    /**
     * Action run from child component after selection change
     * @param  {[string]} selected element
     */
    selectedChanged: function(value){
      this.set('selectedValue', value);
      if (this.get('onChange') !== null) {
        this.sendAction('onChange', value);
      }
    }
  }

});
