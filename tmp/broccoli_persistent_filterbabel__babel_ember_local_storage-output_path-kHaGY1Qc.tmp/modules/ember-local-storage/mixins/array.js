import Ember from 'ember';
import StorageProxyMixin from './storage';

var set = Ember.set;

export default Ember.Mixin.create(StorageProxyMixin, {
  _initialContent: Ember.A(),

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
    set(this, 'content', Ember.A());
  }
});