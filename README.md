# Ember-advanced-form

This addon is for gathering of a set of components that can be used in forms.

For example {{advanced-forms/integer min=3 max=12 value=5}} will create an input element with with two buttons:
"+" and "-". When you click on a specific button it will add or subtract 1 from the value.

## Installation

* `ember install ember-advanced-forms`

## Usage

* Integer field

{{advanced-form/integer min=3 max=12 value=5}}

Integer field creates an input element with two buttons: "+" and "-".

value - an integer value that will be changed by clicking the buttons
min - integer minimum value allowed in this input
max - integer maximum value allowed in this input

To overwrite basic styles in your application stylesheet please use:
.advanced-forms.integer - form main div
.advanced-forms.integer button - for both buttons
.advanced-forms.integer button.plus - for plus button
.advanced-forms.integer button.minus - for minus button
.advanced-forms.integer input - for the input field in the middle
