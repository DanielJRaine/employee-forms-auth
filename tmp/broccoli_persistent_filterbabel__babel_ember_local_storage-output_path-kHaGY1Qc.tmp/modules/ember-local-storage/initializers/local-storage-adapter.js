export { initialize };
import DS from 'ember-data';
import Adapter from 'ember-local-storage/adapters/adapter';

function initialize() {
  if (!DS.Store.prototype._emberLocalStoragePatched) {
    (function () {
      var adapter = Adapter.create();

      DS.Store.reopen({
        _emberLocalStoragePatched: true,
        importData: function importData(json, options) {
          return adapter.importData.call(adapter, this, json, options);
        },
        exportData: function exportData(types, options) {
          return adapter.exportData.call(adapter, this, types, options);
        }
      });
    })();
  }
}

export default {
  name: 'local-storage-adapter',
  after: 'ember-data',
  initialize: initialize
};