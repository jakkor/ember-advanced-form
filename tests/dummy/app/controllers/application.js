import Ember from 'ember';

export default Ember.Controller.extend({

  countryList: [
    'Poland', 'Germany', 'United Kingdom', 'Unated States', 'Ireland', 'Italy'
  ],

  actions: {
    selectedChanged: function(element) {
      console.log("Selected element changed", element);
    }
  }

});
