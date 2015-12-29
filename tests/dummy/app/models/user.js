import DS from 'ember-data';

var User = DS.Model.extend({
  username: DS.attr('string'),
  country: DS.belongsTo('country', {async: true}),
});

export default User;
