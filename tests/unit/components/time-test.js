import { test, moduleForComponent } from 'ember-qunit';

moduleForComponent('advanced-form/time', {
  unit: true
});

test('Setting and updating value', function(assert){
  var component = this.subject();

  component.set("value", "20:24:11");
  assert.equal(component.get('value'), "20:24:11");

  component.set("value", "33:24:11");
  assert.equal(component.get('value'), "00:00:00");

  component.set("value", "20:60:11");
  assert.equal(component.get('value'), "00:00:00");

  component.set("value", "24:40:00");
  assert.equal(component.get('value'), "00:00:00");

  component.set("value", "asasd asasdad aasdsad");
  assert.equal(component.get('value'), "00:00:00");

  component.set("value", "asasd asasdad aasdsad:01");
  assert.equal(component.get('value'), "00:00:00");
});
