import Ember from "ember";

export default Ember.Route.extend({

  model: function() {
    return Ember.RSVP.hash({
      user: this.get('store').findRecord('user', 1),
      countries: this.get('store').findAll('country'),
    });
  }
});
