import hbs from 'htmlbars-inline-precompile';
import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('advanced-form/time', {
  integration: true
});

test('Render component with attributes', function(assert) {
  this.render(
    hbs`{{advanced-form/time format="hh:mm" toUpdate="mm" value="30:20"}}`
  );

  var $componentInput = this.$('.time input');
  assert.equal($componentInput.val(), '23:20');

  $componentInput.val("12:13:45");
  assert.equal($componentInput.val(), '12:13:45');
});

test('Render component with max value', function(assert) {
  this.render(
    hbs`{{advanced-form/time format="hh:mm" toUpdate="mm" value="30:20" max="40:20"}}`
  );

  var $componentInput = this.$('.time input');
  assert.equal($componentInput.val(), '30:20');
});
