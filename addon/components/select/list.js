import Ember from 'ember';
import layout from '../../templates/components/select/list';

export default Ember.Component.extend({
  tagName: 'ul',
  classNameBindings: ['isActive:active'],
  layout: layout,

  isActive: false,

  list: null,

  isActiveObserver: function() {
    this.set('isActive', this.get('parentView.isActive'));
  }.observes('parentView.isActive'),

  actions: {

    select: function(element) {
      this.get('parentView').send('selectedChanged', element);
    }

  }

});
