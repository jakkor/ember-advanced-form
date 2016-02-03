import Ember from 'ember';
import layout from '../../templates/components/multi-select/element';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: [],

  layout: layout,

  option: Ember.ObjectProxy.create({
    content: {}
  }),

  isChecked: function() {
    return this.get('option').get(this.get('mapChecked'));
  }.property(),

  label: function() {
    return this.get('option').get(this.get('mapLabel'));
  }.property()
});
