define('ember-local-storage/local/object', ['exports', 'ember', 'ember-local-storage/mixins/object'], function (exports, _ember, _emberLocalStorageMixinsObject) {
  'use strict';

  exports['default'] = _ember['default'].ObjectProxy.extend(_emberLocalStorageMixinsObject['default'], {
    _storageType: 'local'
  });
});