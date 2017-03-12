define('ember-one-way-controls/components/one-way-input', ['exports', 'ember', 'ember-invoke-action', 'ember-one-way-controls/-private/dynamic-attribute-bindings'], function (exports, _ember, _emberInvokeAction, _emberOneWayControlsPrivateDynamicAttributeBindings) {
  'use strict';

  var Component = _ember['default'].Component;
  var assert = _ember['default'].assert;
  var computed = _ember['default'].computed;
  var _get = _ember['default'].get;
  var isNone = _ember['default'].isNone;
  var schedule = _ember['default'].run.schedule;

  var FORBIDDEN_TYPES = ['checkbox', 'radio'];

  var OneWayInputComponent = Component.extend(_emberOneWayControlsPrivateDynamicAttributeBindings['default'], {
    tagName: 'input',

    attributeBindings: ['type', '_value:value'],

    NON_ATTRIBUTE_BOUND_PROPS: ['keyEvents', 'classNames', 'positionalParamValue', 'update'],

    keyEvents: {
      '13': 'onenter',
      '27': 'onescape'
    },

    change: function change(event) {
      this._processNewValue(event.target.value);
    },

    input: function input(event) {
      this._processNewValue(event.target.value);
    },

    sanitizeInput: function sanitizeInput(input) {
      return input;
    },

    _processNewValue: function _processNewValue(rawValue) {
      var value = (0, _emberInvokeAction.invokeAction)(this, 'sanitizeInput', rawValue);

      if (_get(this, '_value') !== value) {
        (0, _emberInvokeAction.invokeAction)(this, 'update', value);
      }

      schedule('afterRender', this, '_syncValue');
    },

    _syncValue: function _syncValue() {
      if (this.isDestroyed) {
        return;
      }

      var actualValue = _get(this, '_value');
      var renderedValue = this.readDOMAttr('value');

      if (!isNone(actualValue) && !isNone(renderedValue) && actualValue.toString() !== renderedValue.toString()) {
        var elem = this.$().get(0);

        var start = undefined;
        var end = undefined;

        // gaurds because only text, search, url, tel and password support this
        try {
          start = elem.selectionStart;
          end = elem.selectionEnd;
        } catch (e) {
          // no-op
        }

        this.$().val(actualValue);

        try {
          elem.setSelectionRange(start, end);
        } catch (e) {
          // no-op
        }
      }
    },

    keyUp: function keyUp(event) {
      var method = _get(this, 'keyEvents.' + event.keyCode);
      if (method) {
        (0, _emberInvokeAction.invokeAction)(this, method, event.target.value);
      }
    },

    type: computed({
      get: function get() {
        return 'text';
      },

      set: function set(key, type) {
        assert('The {{one-way-input}} component does not support type="' + type + '", use {{one-way-' + type + '}} instead.', FORBIDDEN_TYPES.indexOf(type) === -1);
        return type;
      }
    }),

    _value: computed('positionalParamValue', 'value', {
      get: function get() {
        var value = _get(this, 'positionalParamValue');
        if (value === undefined) {
          value = _get(this, 'value');
        }

        return value;
      }
    }),

    didReceiveAttrs: function didReceiveAttrs() {
      this._super.apply(this, arguments);
      this._processNewValue(_get(this, '_value'));
    }
  });

  OneWayInputComponent.reopenClass({
    positionalParams: ['positionalParamValue']
  });

  exports['default'] = OneWayInputComponent;
});