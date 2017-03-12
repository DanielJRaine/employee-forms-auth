define('ember-local-storage/serializers/serializer', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  var JSONAPISerializer = _emberData['default'].JSONAPISerializer;

  exports['default'] = JSONAPISerializer.extend({
    // Serialization behavior
    _shouldSerializeHasMany: function _shouldSerializeHasMany() {
      return true;
    },
    shouldSerializeHasMany: function shouldSerializeHasMany() {
      return true;
    }
  });
});