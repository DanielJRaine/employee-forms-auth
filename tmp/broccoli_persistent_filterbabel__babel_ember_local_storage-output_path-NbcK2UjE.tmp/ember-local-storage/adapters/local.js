define('ember-local-storage/adapters/local', ['exports', 'ember', 'ember-local-storage/adapters/base', 'ember-local-storage/helpers/storage', 'ember-local-storage/local/array'], function (exports, _ember, _emberLocalStorageAdaptersBase, _emberLocalStorageHelpersStorage, _emberLocalStorageLocalArray) {
  var get = _ember['default'].get;
  exports['default'] = _emberLocalStorageAdaptersBase['default'].extend({
    _storage: (0, _emberLocalStorageHelpersStorage.getStorage)('local'),

    _getIndex: function _getIndex(type) {
      var indices = get(this, '_indices');

      if (!indices[type]) {
        indices[type] = _emberLocalStorageLocalArray['default'].extend({ _storageKey: 'index-' + type }).create();
      }

      return indices[type];
    }
  });
});