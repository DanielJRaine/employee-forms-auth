import DS from 'ember-data';

var JSONAPISerializer = DS.JSONAPISerializer;

export default JSONAPISerializer.extend({
  // Serialization behavior
  _shouldSerializeHasMany: function _shouldSerializeHasMany() {
    return true;
  },
  shouldSerializeHasMany: function shouldSerializeHasMany() {
    return true;
  }
});