define('ember-cli-flash/utils/object-compact', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = objectCompact;
  var isPresent = _ember['default'].isPresent;

  function objectCompact(objectInstance) {
    var compactedObject = {};

    for (var key in objectInstance) {
      var value = objectInstance[key];

      if (isPresent(value)) {
        compactedObject[key] = value;
      }
    }

    return compactedObject;
  }
});