import { test, moduleForComponent } from 'ember-qunit';

moduleForComponent('advanced-form/float', "Unit: Float", {
  unit: true
});

test('Setting and updating value', function(assert) {
  var component = this.subject();

  // Without min and max
  component.set('value', 5);
  assert.equal(component.get('value'), '5.00', "Add decimals points to int value");
  component.set('value', "abcd");
  assert.equal(component.get('value'), '0.00', "Show default if value has wrong format");

  // With min and max
  component.set('min', 10);
  component.set('max', 20);
  component.set('value', 5);
  assert.equal(component.get('value'), '10.00', "Set min value if set value is to low");
  component.set('value', 30);
  assert.equal(component.get('value'), '20.00', "Set max value if set value is to hight");
  component.set('value', 11);
  assert.equal(component.get('value'), '11.00', "Add decimal points to int value");
  component.set('value', "abcd");
  assert.equal(component.get('value'), '10.00', "Set min value if value is in wrong format");
  component.set('value', "12.00");
  assert.equal(component.get('value'), '12.00', "Show set value");
});

test('Test changing value to int (getValueForCalculations)', function(assert) {
  var component = this.subject();
  assert.equal(component.getValueForCalculations(5), 500, "Change 5 to 500 for calculations");

  component.set('precision', 1);
  assert.equal(component.getValueForCalculations(5), 50, "Change 5 to 50 for calculations");

  component.set('precision', 0);
  assert.equal(component.getValueForCalculations(5), 5, "Don't change 5 if precision is 0");
});

test('Test changing value to float (prepareValueToDisplay)', function(assert) {
  var component = this.subject();
  assert.equal(component.prepareValueToDisplay(500), 5.00, "Change 500 to 5.00 for display");

  component.set('precision', 1);
  assert.equal(component.prepareValueToDisplay(50), 5.0, "Change 50 to 5.0 for display");

  component.set('precision', 0);
  assert.equal(component.prepareValueToDisplay(5), 5, "Don't change the number if precision is 0");
});

test('Test update by actions', function(assert) {
  var component = this.subject();
  component.set('value', 5);
  component.send('minus');
  assert.equal(component.get('value'), 4.00, "Minus action works correctly");
  component.send('plus');
  assert.equal(component.get('value'), 5.00, "Plus action works correctly");

  component.set('step', 0.5);
  component.send('minus');
  assert.equal(component.get('value'), 4.50, "Minus action with set step works correctly");
  component.set('step', 0.3);
  component.send('plus');
  assert.equal(component.get('value'), 4.80, "Plus action with set step works correctly");
});
