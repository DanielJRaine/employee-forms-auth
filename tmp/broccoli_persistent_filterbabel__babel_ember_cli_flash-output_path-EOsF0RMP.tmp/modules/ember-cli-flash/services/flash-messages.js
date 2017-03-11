import Ember from 'ember';
import FlashMessage from 'ember-cli-flash/flash/object';
import objectWithout from '../utils/object-without';

var Service = Ember.Service;
var assert = Ember.assert;
var copy = Ember.copy;
var getWithDefault = Ember.getWithDefault;
var isNone = Ember.isNone;
var setProperties = Ember.setProperties;
var typeOf = Ember.typeOf;
var warn = Ember.warn;
var get = Ember.get;
var set = Ember.set;
var computed = Ember.computed;
var classify = Ember.String.classify;
var emberArray = Ember.A;
var equal = computed.equal;
var sort = computed.sort;
var mapBy = computed.mapBy;

var merge = Ember.assign || Ember.merge;

export default Service.extend({
  isEmpty: equal('queue.length', 0).readOnly(),
  _guids: mapBy('queue', '_guid').readOnly(),

  arrangedQueue: sort('queue', function (a, b) {
    if (a.priority < b.priority) {
      return 1;
    } else if (a.priority > b.priority) {
      return -1;
    }
    return 0;
  }).readOnly(),

  init: function init() {
    this._super.apply(this, arguments);
    this._setDefaults();
    this.queue = emberArray();
  },

  add: function add() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    this._enqueue(this._newFlashMessage(options));

    return this;
  },

  clearMessages: function clearMessages() {
    var flashes = get(this, 'queue');

    if (isNone(flashes)) {
      return;
    }

    flashes.clear();

    return this;
  },

  registerTypes: function registerTypes() {
    var _this = this;

    var types = arguments.length <= 0 || arguments[0] === undefined ? emberArray() : arguments[0];

    types.forEach(function (type) {
      return _this._registerType(type);
    });

    return this;
  },

  peekFirst: function peekFirst() {
    return get(this, 'queue.firstObject');
  },

  peekLast: function peekLast() {
    return get(this, 'queue.lastObject');
  },

  getFlashObject: function getFlashObject() {
    var errorText = 'A flass message must be added before it can be returned';
    assert(errorText, get(this, 'queue').length);

    return this.peekLast();
  },

  _newFlashMessage: function _newFlashMessage() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    assert('The flash message cannot be empty.', options.message);

    var flashService = this;
    var allDefaults = getWithDefault(this, 'flashMessageDefaults', {});
    var defaults = objectWithout(allDefaults, ['types', 'injectionFactories', 'preventDuplicates']);

    var flashMessageOptions = merge(copy(defaults), { flashService: flashService });

    for (var key in options) {
      var value = get(options, key);
      var option = this._getOptionOrDefault(key, value);

      set(flashMessageOptions, key, option);
    }

    return FlashMessage.create(flashMessageOptions);
  },

  _getOptionOrDefault: function _getOptionOrDefault(key, value) {
    var defaults = getWithDefault(this, 'flashMessageDefaults', {});
    var defaultOption = get(defaults, key);

    if (typeOf(value) === 'undefined') {
      return defaultOption;
    }

    return value;
  },

  _setDefaults: function _setDefaults() {
    var defaults = getWithDefault(this, 'flashMessageDefaults', {});

    for (var key in defaults) {
      var classifiedKey = classify(key);
      var defaultKey = 'default' + classifiedKey;

      set(this, defaultKey, defaults[key]);
    }

    this.registerTypes(getWithDefault(this, 'defaultTypes', emberArray()));
  },

  _registerType: function _registerType(type) {
    var _this2 = this;

    assert('The flash type cannot be undefined', type);

    this[type] = function (message) {
      var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      var flashMessageOptions = copy(options);
      setProperties(flashMessageOptions, { message: message, type: type });

      return _this2.add(flashMessageOptions);
    };
  },

  _hasDuplicate: function _hasDuplicate(guid) {
    return get(this, '_guids').includes(guid);
  },

  _enqueue: function _enqueue(flashInstance) {
    var preventDuplicates = get(this, 'defaultPreventDuplicates');
    var guid = get(flashInstance, '_guid');

    if (preventDuplicates && this._hasDuplicate(guid)) {
      warn('Attempting to add a duplicate message to the Flash Messages Service', false, {
        id: 'ember-cli-flash.duplicate-message'
      });
      return;
    }

    return get(this, 'queue').pushObject(flashInstance);
  }
});