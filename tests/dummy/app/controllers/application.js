import Ember from 'ember';

export default Ember.Controller.extend({

  actions: {
    selectedChanged: function(element) {
      console.log("Selected element changed", element);
    }
  }

});
