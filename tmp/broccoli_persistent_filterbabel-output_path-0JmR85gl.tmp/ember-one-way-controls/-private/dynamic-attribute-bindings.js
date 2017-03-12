define('ember-one-way-controls/-private/dynamic-attribute-bindings', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  var Mixin = _ember['default'].Mixin;
  var set = _ember['default'].set;

  exports['default'] = Mixin.create({
    NON_ATTRIBUTE_BOUND_PROPS: ['class', 'classNames'],
    concatenatedProperties: ['NON_ATTRIBUTE_BOUND_PROPS'],
    init: function init() {
      this._super.apply(this, arguments);

      var newAttributeBindings = [];
      for (var key in this.attrs) {
        if (this.NON_ATTRIBUTE_BOUND_PROPS.indexOf(key) === -1 && this.attributeBindings.indexOf(key) === -1) {
          newAttributeBindings.push(key);
        }
      }

      set(this, 'attributeBindings', this.attributeBindings.concat(newAttributeBindings));
    }
  });
});