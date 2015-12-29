import Ember from 'ember';
import layout from '../templates/components/select';

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

  // Model with selected property
  model: null,

  // Selected property object
  modelProperty: null,

  // Autocommit - if set to true will run model.save() after change
  autocommit: false,

  /**************
  /* Private stuff
  /**************/
  tagName: 'div',
  layout: layout,
  classNames: ['advanced-form', 'select'],
  classNameBindings: ['isActive:active'],
  selectedElement: null,
  selectedLabel: null,

  /**
   * Setup selected element from model on init
   */
  setupComponent: function() {
    this.set('selectedElement', this.get('model.' + this.get('modelProperty')));
  }.on('init'),

  /**
   * Return the selected label from selected element if there is any. If not set label to null.
   */
  getSelectedLabel: function() {
    if (this.get('selectedElement')) {
      this.set('selectedLabel', this.get('selectedElement.' + this.get('mapLabel')));
      return true;
    }
    this.set('selectedLabel', null);
  }.observes('selectedElement'),

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
     * @param  {[object]} element selected element
     */
    selectedChanged: function(element){
      this.set('model.' + this.get('modelProperty'), element);
      this.set('selectedElement', this.get('model.' + this.get('modelProperty')));
      if (this.get('autocommit')) {
        this.get('model').save();
      }
    }
  }

});
