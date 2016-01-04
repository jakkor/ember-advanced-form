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
* [Time Component](#time_component)
* [Select Component](#select_component)

## Usage  

<a name="integer_component"></a>__Integer Component__  

{{advanced-form/integer min=3 max=12 value=5}}

Integer component creates an input element with two buttons: "+" and "-".

Required attributes:
* value - an integer value that will be changed by clicking the buttons
* min - integer minimum value allowed in this input
* max - integer maximum value allowed in this input

Optional attributes:  
* onChange - action that is send by sendAction when value changes. It sends also the new value to this action.

To overwrite basic styles in your application stylesheet please use:  
* .advanced-forms.integer - form main div,  
* .advanced-forms.integer button - for both buttons,  
* .advanced-forms.integer button.plus - for plus button,  
* .advanced-forms.integer button.minus - for minus button,  
* .advanced-forms.integer input - for the input field in the middle.  

<a name="time_component"></a> __Time Component__  

{{advanced-form/time value="10:58:55" toUpdate="ss"}}

Time component creates an input field with time value. There are also two buttons: "+" and "-" to update time.  

Required attributes:
* value - a string value that will be changed by clicking the buttons,  
* toUpdate - which number should be updated with buttons, default is "ss" - seconds,  
* format - what should be visible. Default is: "hh:mm:ss". hh - is an hour in 24h format, mm - minutes, ss -seconds.

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

