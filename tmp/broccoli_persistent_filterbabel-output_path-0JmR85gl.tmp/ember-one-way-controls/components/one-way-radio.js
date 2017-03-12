define('ember-one-way-controls/components/one-way-radio', ['exports', 'ember', 'ember-invoke-action', 'ember-one-way-controls/-private/dynamic-attribute-bindings'], function (exports, _ember, _emberInvokeAction, _emberOneWayControlsPrivateDynamicAttributeBindings) {
  'use strict';

  var Component = _ember['default'].Component;
  var computed = _ember['default'].computed;
  var get = _ember['default'].get;
  var set = _ember['default'].set;

  var OneWayRadioComponent = Component.extend(_emberOneWayControlsPrivateDynamicAttributeBindings['default'], {
    tagName: 'input',
    type: 'radio',

    NON_ATTRIBUTE_BOUND_PROPS: ['update', 'option', 'value'],

    attributeBindings: ['checked', 'option:value', 'type'],

    checked: computed('_value', 'option', function () {
      return get(this, '_value') === get(this, 'option');
    }),

    click: function click() {
      (0, _emberInvokeAction.invokeAction)(this, 'update', get(this, 'option'));
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

  exports['default'] = OneWayRadioComponent;
});