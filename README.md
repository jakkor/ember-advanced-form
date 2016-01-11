# Ember-advanced-form

This addon is a set of components that can be used in forms.

For example {{advanced-forms/integer min=3 max=12 value=5}} will create an input element with with two buttons:
"+" and "-". When you click on a specific button it will add or subtract 1 from the value.

## Installation

* `ember install ember-advanced-form`

## Run Examples

To see some examples please run the dummy app:

* `ember serve`


## Templates  

There are two color templates, but for now not ready for production.

To change default template update ember-cli-build.js file in your application:

```javascript
module.exports = function(defaults) {
  var app = new EmberAddon(defaults, {
    advancedForm: {
      template: "dark",
    }
  });
  return app.toTree();
};
```

## Available Components

* [Integer Component](#integer_component)
* [Float Component](#float_component)
* [Time Component](#time_component)
* [Select Component](#select_component)
* [Simple Select Component](#simple_select_component)

## Usage  

<a name="integer_component"></a>__Integer Component__  

{{advanced-form/integer min=3 max=12 value=5}}

Integer component creates an input element with two buttons: "+" and "-".  

Required attributes:  
* value - an integer value that will be changed by clicking the buttons.  

Optional attributes:  
* onChange - action that is send by sendAction when value changes. It sends also the new value to this action,  
* min - integer minimum value allowed in this input,  
* max - integer maximum value allowed in this input.  

To overwrite basic styles in your application stylesheet please use:  
* .advanced-forms.integer - form main div,  
* .advanced-forms.integer button - for both buttons,  
* .advanced-forms.integer button.plus - for plus button,  
* .advanced-forms.integer button.minus - for minus button,  
* .advanced-forms.integer input - for the input field in the middle.  

<a name="float_component"></a>__Float Component__  

{{advanced-form/float min=3.050 max=12.500 value=5.000 precision=3 step=0.050}}  

Float component creates an input element with two buttons: "+" and "-".  

Required attributes:  
* value - a float value that will be changed by clicking the buttons.  

Optional attributes:  
* onChange - action that is send by sendAction when value changes. It sends also the new value to this action.
* min - float minimum value allowed in this input,  
* max - float maximum value allowed in this input,  
* precision - default is "2" which means that number will have 2 decimal digits,  
* step - how much the value should change. For example 0.5.  

To overwrite basic styles in your application stylesheet please use:  
* .advanced-forms.float - form main div,  
* .advanced-forms.float button - for both buttons,  
* .advanced-forms.flo
at button.plus - for plus button,  
* .advanced-forms.float button.minus - for minus button,  
* .advanced-forms.float input - for the input field in the middle.  

<a name="time_component"></a> __Time Component__  

{{advanced-form/time value="10:58:55" toUpdate="ss"}}

Time component creates an input field with time value. There are also two buttons: "+" and "-" to update time.  

Required attributes:
* value - a string value that will be changed by clicking the buttons,  
* format - what should be visible. Default is: "hh:mm:ss". hh - is an hour in 24h format, mm - minutes, ss -seconds.

Optional attributes:  
* toUpdate - which number should be updated with buttons, for example "ss" for seconds. If this option will not be set it will look for caret position in input field to determine what to update.  
* max - max values. For format "hh:mm:ss" we can set for example "--:70:70".  
"--" means that there is no max value.  

To overwrite basic styles in your application stylesheet please use:  
* .advanced-forms.time - form main div,  
* .advanced-forms.time button - for both buttons,  
* .advanced-forms.time button.plus - for plus button,  
* .advanced-forms.time button.minus - for minus button,  
* .advanced-forms.time input - for the input field in the middle.  

<a name="select_component"></a>__Select Component__  

{{advanced-form/select list=countryList mapLabel="name" model=user modelProperty="country"}}

Select component that will display a drop down field with list of elements. It requires a model with a property that we will update.  

Required attributes:  
* list - list of elements to chose from,  
* model - Model with selected element or where the selected element has to be set,  
* modelProperty - model property name that holds selected element.  

Optional attributes:  
* malLabel - name of label property that should be used. Default is "label",  
* autocommit - If set to true it will run model.save() after choosing new selected element. Default is false,  
* placeHolder - Placeholder visible when nothing is selected. Default is '--------'.

To overwrite basic styles in your application stylesheet please use:  
* .advanced-forms.select - form main div,  
* .advanced-forms.select > ul > li > a - for selected element,  
* .advanced-forms.select > ul > li > ul > li - for list elements,  

<a name="simple_select_component"></a>__Simple Select Component__  

{{advanced-form/simple-select list=countryList selectedValue="Poland"}}  

Similar to [Select Component](#select_component). The main difference is that instead of model and objects we can use simple values list.

Required attributes:  
* list - list of values to chose from.  

Optional attributes:  
* selectedValue - Selected value.  

Styles overwrites works the same way as for [Select Component](#select_component). There is only additional "simple-select" class added to the component if we would want to change the styles only for this.
