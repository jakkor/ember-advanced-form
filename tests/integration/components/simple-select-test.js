import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import startApp from '../../helpers/start-app';
import hbs from 'htmlbars-inline-precompile';

var App;

moduleForComponent('advanced-form/simple-select', {
  integration: true,
  setup: function() {
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test('Renders correctly component with default values', function(assert){
  this.set('countryList', ["Poland", "United Kingdom"]);

  this.render(
    hbs`{{advanced-form/simple-select list=countryList}}`
  );

  assert.equal(this.$('.select > ul > li > a').text(), '--------', 'Selected starts as --------');
});

test('Can change country', function(assert) {
  var countryList;

  countryList = ["Poland", "United Kingdom"];

  this.set('countryList', countryList);
  this.set('defaultValue', "United Kingdom");

  this.render(
    hbs`{{advanced-form/simple-select list=countryList selectedValue=defaultValue}}`
  );

  assert.equal(this.$('.select > ul > li > a').text(), 'United Kingdom', 'set correct default user setting');

  click(this.$('.select'));

  andThen(function(){
    assert.equal(this.$('.select').hasClass('active'), true, "List opened");
  });

  click(this.$('.select > ul > li > ul > li:nth-child(1) > a'));

  andThen(function(){
    assert.equal(this.$('.select > ul > li > a').text(), 'Poland', 'Change selected country after click');
    assert.equal(this.$('.select').hasClass('active'), false, "List closed");
  });

});
