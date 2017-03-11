import Ember from 'ember';
import StorageProxyMixin from './storage';

var set = Ember.set;

export default Ember.Mixin.create(StorageProxyMixin, {
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