define('ember-one-way-controls/index', ['exports', 'ember-one-way-controls/components/one-way-select', 'ember-one-way-controls/components/one-way-input'], function (exports, _emberOneWayControlsComponentsOneWaySelect, _emberOneWayControlsComponentsOneWayInput) {
  'use strict';

  Object.defineProperty(exports, 'OneWaySelect', {
    enumerable: true,
    get: function get() {
      return _emberOneWayControlsComponentsOneWaySelect.OneWaySelect;
    }
  });
  Object.defineProperty(exports, 'OneWayInput', {
    enumerable: true,
    get: function get() {
      return _emberOneWayControlsComponentsOneWayInput['default'];
    }
  });
});