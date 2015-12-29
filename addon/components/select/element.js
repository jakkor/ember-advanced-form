import Ember from 'ember';
import layout from '../../templates/components/select/element';

export default Ember.Component.extend({
  tagName: 'a',
  layout: layout,

  mapLabel: 'label',
  mapID: 'ID',

  item: null,

  getLabel: (function() {
    return this.get('item.' + this.get('mapLabel'));
  }).property(),

  click: function() {
    this.get('parentView').send('select', this.get('item'));
  }
});
