import Ember from 'ember';

export default Ember.Mixin.create({
  // Solution based on: http://flightschool.acylt.com/devnotes/caret-position-woes/
  getCaretPosition: function(oField) {

     var iCaretPos = 0;

     // IE Support
     if (document.selection) {
       // Set focus on the element
       oField.focus ();

       // Get Position
       var oSel = document.selection.createRange ();
       oSel.moveStart ('character', -oField.value.length);
       iCaretPos = oSel.text.length;
     }

     // Firefox support
     else if (oField.selectionStart || oField.selectionStart === '0') {

       // Get position
       iCaretPos = oField.selectionStart;
     }

     // Return results
     return (iCaretPos);
  },

  /**
   * Click action checks if toUpdate has been set.
   * If not we check the caret position to determine which number should be updated when "+" or "-" are clicked.
   */
  click: function() {
    if (this.get('parentView.toUpdate') !== null) {
      return;
    }

    var caretPos = this.getCaretPosition(this.$()[0]);
    var keys = Object.keys(this.get('parentView.parts'));
    var len = 0;

    for (var i = 0; i < keys.length; i++) {
      len += keys[i].length;
      if (len >= caretPos) {
        this.set('parentView._toUpdate', keys[i]);
        break;
      }
      len++;
    }
  }
});
