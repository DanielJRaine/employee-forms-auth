define('ember-one-way-controls/components/one-way-checkbox', ['exports', 'ember', 'ember-invoke-action', 'ember-one-way-controls/-private/dynamic-attribute-bindings'], function (exports, _ember, _emberInvokeAction, _emberOneWayControlsPrivateDynamicAttributeBindings) {
  'use strict';

  var Component = _ember['default'].Component;
  var get = _ember['default'].get;
  var set = _ember['default'].set;

  var OneWayCheckboxComponent = Component.extend(_emberOneWayControlsPrivateDynamicAttributeBindings['default'], {
    tagName: 'input',
    type: 'checkbox',

    NON_ATTRIBUTE_BOUND_PROPS: ['update'],

    attributeBindings: ['isChecked:checked', 'type', 'value'],

    click: function click(event) {
      (0, _emberInvokeAction.invokeAction)(this, 'update', this.readDOMAttr('checked'), event);
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

  exports['default'] = OneWayCheckboxComponent;
});