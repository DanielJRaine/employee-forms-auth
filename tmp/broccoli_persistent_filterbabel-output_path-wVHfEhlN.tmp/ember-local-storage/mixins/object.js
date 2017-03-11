define('ember-local-storage/mixins/object', ['exports', 'ember', 'ember-local-storage/mixins/storage'], function (exports, _ember, _emberLocalStorageMixinsStorage) {
  'use strict';

  var set = _ember['default'].set;

  exports['default'] = _ember['default'].Mixin.create(_emberLocalStorageMixinsStorage['default'], {
    _initialContent: {},

    setUnknownProperty: function setUnknownProperty(key) {
      this._super.apply(this, arguments);

      if (key !== '_isInitialContent') {
        this._save();
      }
    },

    set: function set(key) {
      this._super.apply(this, arguments);

      if (key !== '_isInitialContent') {
        this._save();
      }
    },

    setProperties: function setProperties() {
      this._super.apply(this, arguments);
      this._save();
    },

    _clear: function _clear() {
      set(this, 'content', {});
    }
  });
});