/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-advanced-forms',

  included: function(app) {
    this._super.included(app);

    app.import('app/styles/app.css');
  }
};
