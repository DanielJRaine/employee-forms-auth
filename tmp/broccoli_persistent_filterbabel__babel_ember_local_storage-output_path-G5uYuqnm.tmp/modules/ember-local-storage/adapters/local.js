import Ember from 'ember';
import BaseAdapter from './base';
import { getStorage } from '../helpers/storage';
import StorageArray from '../local/array';

var get = Ember.get;

export default BaseAdapter.extend({
  _storage: getStorage('local'),

  _getIndex: function _getIndex(type) {
    var indices = get(this, '_indices');

    if (!indices[type]) {
      indices[type] = StorageArray.extend({ _storageKey: 'index-' + type }).create();
    }

    return indices[type];
  }
});