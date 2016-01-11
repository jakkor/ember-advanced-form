import hbs from 'htmlbars-inline-precompile';
import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('advanced-form/float', {
  integration: true
});

test('Render component with attributes', function(assert) {
  this.render(
    hbs`{{advanced-form/float min=10 max=20 value=5 step="0.5" precision="2"}}`
  );

  var $componentInput = this.$('.integer input');
  assert.equal($componentInput.val(), '10.00');
});
