import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import startApp from '../../helpers/start-app';
import hbs from 'htmlbars-inline-precompile';

var App;

moduleForComponent('advanced-form/select', {
  integration: true,
  setup: function() {
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test('Renders correctly component with default values', function(assert){
  this.set('countryList', [
    {id: 1, name: "Poland", code: "PL"},
    {id: 2, name: "United Kingdom", code: "UK"}
  ]);

  this.render(
    hbs`{{advanced-form/select list=countryList mapLabel="name" mapID="ID" model=user modelProperty="country"}}`
  );

  assert.equal(this.$('.select > ul > li > a').text(), '--------', 'Selected starts as --------');
});

test('Can change country', function(assert) {
  var user, countryList;

  countryList = [
    {id: 1, name: "Poland", code: "PL"},
    {id: 2, name: "United Kingdom", code: "UK"}
  ];

  user = {
    id: 1,
    username: "User 1",
    country: countryList[0]
  };

  this.set('countryList', countryList);
  this.set('user', user);
  this.render(
    hbs`{{advanced-form/select list=countryList mapLabel="name" mapID="ID" model=user modelProperty="country"}}`
  );

  assert.equal(this.$('.select > ul > li > a').text(), 'Poland', 'set correct default user setting');

  click(this.$('.select'));

  andThen(function(){
    assert.equal(this.$('.select').hasClass('active'), true, "List opened");
  });

  click(this.$('.select > ul > li > ul > li:nth-child(2) > a'));

  andThen(function(){
    assert.equal(this.$('.select > ul > li > a').text(), 'United Kingdom', 'Change selected country after click');
    assert.equal(this.$('.select').hasClass('active'), false, "List closed");
  });

});
