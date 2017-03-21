define('ember-local-storage/mixins/storage', ['exports', 'ember', 'ember-local-storage/helpers/storage'], function (exports, _ember, _emberLocalStorageHelpersStorage) {
  var Mixin = _ember['default'].Mixin;
  var get = _ember['default'].get;
  var set = _ember['default'].set;
  var deprecate = _ember['default'].deprecate;
  var copy = _ember['default'].copy;
  var isArray = _ember['default'].isArray;

  var assign = _ember['default'].assign || _ember['default'].merge;

  exports['default'] = Mixin.create({
    // TODO remove on 2.0 release
    _storageKey: null,
    // TODO remove on 2.0 release
    initialContent: null,
    _initialContent: null,
    _initialContentString: null,
    _isInitialContent: true,
    // we need it for storage event testing
    _testing: false,

    // Shorthand for the storage
    _storage: function _storage() {
      return (0, _emberLocalStorageHelpersStorage.getStorage)(get(this, '_storageType'));
    },

    init: function init() {
      var storage = this._storage();

      var serialized = undefined,
          content = undefined,
          storageKey = get(this, '_storageKey'),
          initialContent = get(this, '_initialContent');

      // TODO remove on 2.0 release and make storageKey a const
      if (get(this, 'storageKey')) {
        storageKey = get(this, 'storageKey');
        deprecate('Usage of storageKey is deprecated use the generator instead: ember g storage -h');
      }

      // TODO remove on 2.0 release and make initialContent a const
      if (get(this, 'initialContent')) {
        initialContent = get(this, 'initialContent');
        deprecate('Usage of initialContent is deprecated use the generator instead: ember g storage -h');
      }

      // TODO remove on 2.0 release
      if (!initialContent) {
        throw new Error('You must specify the initialContent.');
      }

      set(this, '_initialContentString', JSON.stringify(initialContent));

      // Retrieve the serialized version from storage..
      serialized = storage[storageKey];

      // Merge the serialized version into defaults.
      content = this._getInitialContentCopy();

      if (serialized) {
        assign(content, JSON.parse(serialized));
      }

      // Do not change to set(this, 'content', content)
      this.set('content', content);

      // Keep in sync with other windows
      this._addStorageListener();

      return this._super.apply(this, arguments);
    },

    _getInitialContentCopy: function _getInitialContentCopy() {
      var initialContent = get(this, '_initialContent'),
          content = copy(initialContent, true);

      // Ember.copy returns a normal array when prototype extensions are off
      // This ensures that we wrap it in an Ember Array.
      return isArray(content) ? _ember['default'].A(content) : content;
    },

    _addStorageListener: function _addStorageListener() {
      var _this = this;

      var storage = this._storage(),
          storageKey = get(this, '_storageKey');

      if (window.addEventListener) {
        this._storageEventHandler = function (event) {
          if (_this.isDestroying) {
            return;
          }

          if (event.storageArea === storage && event.key === storageKey) {
            if ('hidden' in document && !document.hidden && !_this._testing || event.newValue === event.oldValue || event.newValue === JSON.stringify(_this.get('content'))) {
              return;
            }

            if (event.newValue) {
              _this.set('content', JSON.parse(event.newValue));
            } else {
              _this.clear();
            }
          }
        };

        window.addEventListener('storage', this._storageEventHandler, false);
      }
    },

    _save: function _save() {
      var storage = this._storage(),
          content = get(this, 'content'),
          storageKey = get(this, '_storageKey'),
          initialContentString = get(this, '_initialContentString');

      if (storageKey) {
        var json = JSON.stringify(content);

        if (json !== initialContentString) {
          set(this, '_isInitialContent', false);
        }

        storage[storageKey] = json;
      }
    },

    willDestroy: function willDestroy() {
      if (this._storageEventHandler) {
        window.removeEventHandler('storage', this._storageEventHandler, false);
      }

      this._super.apply(this, arguments);
    },

    // Public API

    // returns boolean
    isInitialContent: function isInitialContent() {
      return get(this, '_isInitialContent');
    },

    // reset the content
    // returns void
    reset: function reset() {
      var content = this._getInitialContentCopy();

      // Do not change to set(this, 'content', content)
      this.set('content', content);
      set(this, '_isInitialContent', true);
    },

    // clear the content
    // returns void
    clear: function clear() {
      this._clear();
      delete this._storage()[get(this, '_storageKey')];
    }
  });
});