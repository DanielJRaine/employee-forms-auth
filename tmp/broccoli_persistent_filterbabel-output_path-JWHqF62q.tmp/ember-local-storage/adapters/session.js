define('ember-local-storage/adapters/session', ['exports', 'ember', 'ember-local-storage/adapters/base', 'ember-local-storage/helpers/storage', 'ember-local-storage/session/array'], function (exports, _ember, _emberLocalStorageAdaptersBase, _emberLocalStorageHelpersStorage, _emberLocalStorageSessionArray) {
  'use strict';

  var get = _ember['default'].get;

  exports['default'] = _emberLocalStorageAdaptersBase['default'].extend({
    _storage: (0, _emberLocalStorageHelpersStorage.getStorage)('session'),

    _getIndex: function _getIndex(type) {
      var indices = get(this, '_indices');

      if (!indices[type]) {
        indices[type] = _emberLocalStorageSessionArray['default'].extend({ _storageKey: 'index-' + type }).create();
      }

      return indices[type];
    }
  });
});