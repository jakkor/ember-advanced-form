import Ember from 'ember';
import layout from '../../templates/components/select/list';

export default Ember.Component.extend({
  tagName: 'ul',
  classNameBindings: ['isActive:active'],
  layout: layout,

  isActive: false,

  list: null,

  selectedChanged: 'selectedChanged',

  actions: {

    select: function(element) {
      this.sendAction('selectedChanged', element);
    }

  }

});
