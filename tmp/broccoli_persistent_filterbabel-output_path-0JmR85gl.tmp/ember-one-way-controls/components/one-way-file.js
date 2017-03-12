define('ember-one-way-controls/components/one-way-file', ['exports', 'ember-one-way-controls/components/one-way-input'], function (exports, _emberOneWayControlsComponentsOneWayInput) {
  'use strict';

  exports['default'] = _emberOneWayControlsComponentsOneWayInput['default'].extend({
    type: 'file'
  });
});