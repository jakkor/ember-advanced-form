import Ember from 'ember';
import layout from '../../templates/components/simple-select/element';

export default Ember.Component.extend({
  tagName: 'a',
  layout: layout,

  item: null,

  click: function() {
    this.get('parentView').send('select', this.get('item'));
  }
});
