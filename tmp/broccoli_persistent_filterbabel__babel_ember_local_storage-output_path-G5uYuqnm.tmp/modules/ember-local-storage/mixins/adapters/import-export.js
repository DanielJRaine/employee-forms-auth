import Ember from 'ember';

var Mixin = Ember.Mixin;
var get = Ember.get;
var singularize = Ember.String.singularize;
var run = Ember.run;

var assign = Ember.assign || Ember.merge;

export default Mixin.create({
  importData: function importData(store, content, options) {
    var _this = this;

    // merge defaults
    options = assign({
      json: true,
      truncate: true
    }, options || {});

    var reloadTypes = [];

    content = options.json ? JSON.parse(content) : content;

    if (options.truncate) {
      content.data.forEach(function (record) {
        var type = record.type;

        _this._getIndex(type).forEach(function (storageKey) {
          delete get(_this, '_storage')[storageKey];
        });

        _this._getIndex(type).reset();

        // unload from store
        store.unloadAll(singularize(type));
      });
    }

    var promises = content.data.map(function (record) {
      // collect types to reload
      reloadTypes.push(singularize(record.type));

      return _this._handleStorageRequest(null, 'POST', {
        data: { data: record }
      });
    });

    return Ember.RSVP.all(promises).then(function () {
      // reload from store
      reloadTypes.forEach(function (type) {
        store.findAll(type);
      });
    });
  },

  exportData: function exportData(store, types, options) {
    var _this2 = this;

    // merge defaults
    options = assign({
      json: true,
      download: false,
      filename: 'ember-data.json'
    }, options || {});

    var json = undefined,
        data = undefined;

    // collect data
    data = types.reduce(function (records, type) {
      var url = _this2.buildURL(type),
          exportData = _this2._handleGETRequest(url);

      records.data = records.data.concat(exportData);
      return records;
    }, { data: [] });

    if (options.json || options.download) {
      json = JSON.stringify(data);
    }

    if (options.json) {
      data = json;
    }

    if (options.download) {
      window.saveAs(new Blob([json], { type: 'application/json;charset=utf-8' }), options.filename);
    }

    return new Ember.RSVP.Promise(function (resolve) {
      run(null, resolve, data);
    }, 'DS: LocalStorageAdapter#exportData');
  }
});