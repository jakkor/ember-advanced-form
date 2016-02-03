import DS from 'ember-data';

var Country = DS.Model.extend({
  name: DS.attr('string'),
  code: DS.attr('string'),
  checked: DS.attr('boolean')

});

export default Country;
