import Ember from 'ember';
import { invokeAction } from 'ember-invoke-action';
import DynamicAttributeBindings from '../-private/dynamic-attribute-bindings';

var Component = Ember.Component;
var computed = Ember.computed;
var get = Ember.get;
var set = Ember.set;

var OneWayRadioComponent = Component.extend(DynamicAttributeBindings, {
  tagName: 'input',
  type: 'radio',

  NON_ATTRIBUTE_BOUND_PROPS: ['update', 'option', 'value'],

  attributeBindings: ['checked', 'option:value', 'type'],

  checked: computed('_value', 'option', function () {
    return get(this, '_value') === get(this, 'option');
  }),

  click: function click() {
    invokeAction(this, 'update', get(this, 'option'));
  },

  didReceiveAttrs: function didReceiveAttrs() {
    this._super.apply(this, arguments);

    var value = get(this, 'paramValue');
    if (value === undefined) {
      value = get(this, 'value');
    }

    set(this, '_value', value);
  }
});

OneWayRadioComponent.reopenClass({
  positionalParams: ['paramValue']
});

export default OneWayRadioComponent;