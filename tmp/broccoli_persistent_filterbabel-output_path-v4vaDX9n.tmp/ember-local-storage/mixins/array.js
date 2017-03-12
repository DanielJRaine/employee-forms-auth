define('ember-local-storage/mixins/array', ['exports', 'ember', 'ember-local-storage/mixins/storage'], function (exports, _ember, _emberLocalStorageMixinsStorage) {
  'use strict';

  var set = _ember['default'].set;

  exports['default'] = _ember['default'].Mixin.create(_emberLocalStorageMixinsStorage['default'], {
    _initialContent: _ember['default'].A(),

    replaceContent: function replaceContent() {
      this._super.apply(this, arguments);
      this._save();
    },

    // we need to save
    reset: function reset() {
      this._super.apply(this, arguments);
      this._save();
    },

    _clear: function _clear() {
      set(this, 'content', _ember['default'].A());
    }
  });
});