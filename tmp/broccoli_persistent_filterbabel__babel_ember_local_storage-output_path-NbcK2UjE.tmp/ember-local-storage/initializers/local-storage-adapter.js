define('ember-local-storage/initializers/local-storage-adapter', ['exports', 'ember-data', 'ember-local-storage/adapters/adapter'], function (exports, _emberData, _emberLocalStorageAdaptersAdapter) {
  exports.initialize = initialize;

  function initialize() {
    if (!_emberData['default'].Store.prototype._emberLocalStoragePatched) {
      (function () {
        var adapter = _emberLocalStorageAdaptersAdapter['default'].create();

        _emberData['default'].Store.reopen({
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

  exports['default'] = {
    name: 'local-storage-adapter',
    after: 'ember-data',
    initialize: initialize
  };
});