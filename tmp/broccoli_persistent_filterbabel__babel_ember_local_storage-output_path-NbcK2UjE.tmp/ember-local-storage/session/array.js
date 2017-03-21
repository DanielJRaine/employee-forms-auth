define('ember-local-storage/session/array', ['exports', 'ember', 'ember-local-storage/mixins/array'], function (exports, _ember, _emberLocalStorageMixinsArray) {
  exports['default'] = _ember['default'].ArrayProxy.extend(_emberLocalStorageMixinsArray['default'], {
    _storageType: 'session'
  });
});