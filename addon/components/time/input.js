import Ember from 'ember';
import CaretMixin from '../../mixins/caret';

export default Ember.TextField.extend(CaretMixin, {
  tagName: 'input',
  classNames: [],

  type: "text",

  value: null,

  attributeBindings: ['type', 'value', 'disabled'],
});
