define('ember-one-way-controls/components/one-way-datetime-local', ['exports', 'ember-one-way-controls/components/one-way-input'], function (exports, _emberOneWayControlsComponentsOneWayInput) {
  'use strict';

  exports['default'] = _emberOneWayControlsComponentsOneWayInput['default'].extend({
    type: 'datetime-local'
  });
});