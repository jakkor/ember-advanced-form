import Ember from 'ember';
import layout from '../templates/components/simple-select';

export default Ember.Component.extend({
  /**************
  /* Attributes
  /**************/

  // If select list is active
  isActive: false,

  // Placeholder when nothing is selected
  placeHolder: '--------',

  // What property is a label that should be shown
  mapLabel: 'label',

  // Array of object for the drop down field
  list: [],

  /**************
  /* Private stuff
  /**************/
  tagName: 'div',
  layout: layout,
  classNames: ['advanced-form', 'select', 'simple-select'],
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
    }
  }

});
