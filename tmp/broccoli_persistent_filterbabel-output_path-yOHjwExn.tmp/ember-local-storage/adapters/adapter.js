define('ember-local-storage/adapters/adapter', ['exports', 'ember-local-storage/adapters/local'], function (exports, _emberLocalStorageAdaptersLocal) {
  'use strict';

  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberLocalStorageAdaptersLocal['default'];
    }
  });
});