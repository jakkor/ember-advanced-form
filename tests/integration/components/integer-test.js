import hbs from 'htmlbars-inline-precompile';
import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('advanced-form/integer', {
  integration: true
});

test('Render component with attributes', function(assert) {
  this.render(
    hbs`{{advanced-form/integer min=10 max=20 value=5}}`
  );

  var $componentInput = this.$('.integer input');
  assert.equal($componentInput.val(), '10');
});
