import { test, moduleForComponent } from 'ember-qunit';

moduleForComponent('advanced-form/integer', {
  unit: true
});

test('Setting and updating value', function(assert){
  var component = this.subject();

  // Without min and max
  component.set('value', 5);
  assert.equal(component.get('value'), '5');
  component.set('value', "abcd");
  assert.equal(component.get('value'), '0');

  // With min and max
  component.set('min', 10);
  component.set('max', 20);
  component.set('value', 5);
  assert.equal(component.get('value'), '10');
  component.set('value', 30);
  assert.equal(component.get('value'), '20');
  component.set('value', 11);
  assert.equal(component.get('value'), '11');
  component.set('value', "abcd");
  assert.equal(component.get('value'), '10');
});
