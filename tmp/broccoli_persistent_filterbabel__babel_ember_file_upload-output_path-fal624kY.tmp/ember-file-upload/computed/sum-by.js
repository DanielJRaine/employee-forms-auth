define('ember-file-upload/computed/sum-by', ['exports', 'ember'], function (exports, _ember) {
  var get = _ember['default'].get;
  var computed = _ember['default'].computed;

  exports['default'] = function (collectionKey, itemKey) {
    return computed(collectionKey + '.@each.' + itemKey, function () {
      var collection = get(this, collectionKey);

      return collection.reduce(function (sum, item) {
        return sum + get(item, itemKey);
      }, 0);
    });
  };
});