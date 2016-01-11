import { test, moduleForComponent } from 'ember-qunit';

moduleForComponent('advanced-form/time', {
  unit: true
});

test('Setting and updating value', function(assert){
  var component = this.subject();

  component.set("value", "20:24:11");
  assert.equal(component.get('value'), "20:24:11");

  component.set("value", "33:24:11");
  assert.equal(component.get('value'), "23:24:11");

  component.set("value", "20:60:11");
  assert.equal(component.get('value'), "20:59:11");

  component.set("value", "24:40:00");
  assert.equal(component.get('value'), "23:40:00");

  component.set("value", "asasd asasdad aasdsad");
  assert.equal(component.get('value'), "00:00:00");

  component.set("value", "asasd asasdad aasdsad:01");
  assert.equal(component.get('value'), "00:00:00");

  component.set("max", "40:70:70");
  component.init();
  component.set("value", "24:60:60");
  assert.equal(component.get('value'), "24:60:60");

  component.set("value", "60:80:80");
  assert.equal(component.get('value'), "40:70:70");
});
