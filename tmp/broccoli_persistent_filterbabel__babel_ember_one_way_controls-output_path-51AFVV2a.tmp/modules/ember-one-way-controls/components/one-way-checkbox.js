import Ember from 'ember';
import { invokeAction } from 'ember-invoke-action';
import DynamicAttributeBindings from '../-private/dynamic-attribute-bindings';

var Component = Ember.Component;
var get = Ember.get;
var set = Ember.set;

var OneWayCheckboxComponent = Component.extend(DynamicAttributeBindings, {
  tagName: 'input',
  type: 'checkbox',

  NON_ATTRIBUTE_BOUND_PROPS: ['update'],

  attributeBindings: ['isChecked:checked', 'type', 'value'],

  click: function click(event) {
    invokeAction(this, 'update', this.readDOMAttr('checked'), event);
  },

  didReceiveAttrs: function didReceiveAttrs() {
    this._super.apply(this, arguments);

    var value = get(this, 'paramChecked');
    if (value === undefined) {
      value = get(this, 'checked');
    }

    set(this, 'isChecked', value);
  }
});

OneWayCheckboxComponent.reopenClass({
  positionalParams: ['paramChecked']
});

export default OneWayCheckboxComponent;