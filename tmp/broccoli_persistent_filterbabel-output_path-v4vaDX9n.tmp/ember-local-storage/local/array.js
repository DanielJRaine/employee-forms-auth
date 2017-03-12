define('ember-local-storage/local/array', ['exports', 'ember', 'ember-local-storage/mixins/array'], function (exports, _ember, _emberLocalStorageMixinsArray) {
  'use strict';

  exports['default'] = _ember['default'].ArrayProxy.extend(_emberLocalStorageMixinsArray['default'], {
    _storageType: 'local'
  });
});