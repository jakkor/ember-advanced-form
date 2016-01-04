/* jshint node: true */
'use strict';
//import configENV from '../config/environment';

module.exports = {
  name: 'ember-advanced-form',

  included: function(app) {
    var template = this.getTemplate(app);
    app.import('vendor/advancedForm/' + template + '.css');
    this._super.included.call(this, app);
  },

  /**
   * Get chosen template. If no template is set in the project, or set template does not exits default one will be used.
   * @param  {object} app
   * @return {string} template name - css file that should be loaded.
   */
  getTemplate: function(app) {
    var options = app.options.advancedForm;
    var templateList = this.getTemplateList();
    if (
      typeof options === "undefined" ||
      typeof options.template === "undefined" || options.template === null ||
      typeof templateList === "undefined" //|| templateList instanceof !== "Array" ||
    ) {
      return "default";
    }

    if (templateList instanceof Array && templateList.indexOf(options.template) !== -1) {
      return options.template;
    }

    return "default";
  },

  /**
   * Get available templates list
   * @return {array} templates list
   */
  getTemplateList: function() {
    return ["dark"];
  }
};
