import Ember from 'ember';
import customComputed from '../utils/computed';

var EmberObject = Ember.Object;
var readOnly = Ember.computed.readOnly;
var _Ember$run = Ember.run;
var later = _Ember$run.later;
var cancel = _Ember$run.cancel;
var Evented = Ember.Evented;
var get = Ember.get;
var set = Ember.set;

export default EmberObject.extend(Evented, {
  timer: null,
  exitTimer: null,
  exiting: false,
  initializedTime: null,

  queue: readOnly('flashService.queue'),
  totalTimeout: customComputed.add('timeout', 'extendedTimeout').readOnly(),
  _guid: customComputed.guidFor('message').readOnly(),

  init: function init() {
    this._super.apply(this, arguments);

    if (get(this, 'sticky')) {
      return;
    }

    this._setupTimers();
    this._setInitializedTime();
  },

  destroyMessage: function destroyMessage() {
    var queue = get(this, 'queue');

    if (queue) {
      queue.removeObject(this);
    }

    this.destroy();
    this.trigger('didDestroyMessage');
  },

  exitMessage: function exitMessage() {
    set(this, 'exiting', true);

    this._cancelTimer('exitTimer');
    this.trigger('didExitMessage');
  },

  willDestroy: function willDestroy() {
    this._cancelAllTimers();

    var onDestroy = get(this, 'onDestroy');

    if (onDestroy) {
      onDestroy();
    }

    this._super.apply(this, arguments);
  },

  deferTimers: function deferTimers() {
    if (get(this, 'sticky')) {
      return;
    }
    var timeout = get(this, 'timeout');
    var remainingTime = timeout - this._getElapsedTime();
    set(this, 'timeout', remainingTime);

    this._cancelAllTimers();
  },

  resumeTimers: function resumeTimers() {
    if (get(this, 'sticky')) {
      return;
    }
    this._setupTimers();
  },

  // private
  _setTimer: function _setTimer(name, methodName, timeout) {
    return set(this, name, later(this, methodName, timeout));
  },

  _setupTimers: function _setupTimers() {
    this._setTimer('exitTimer', 'exitMessage', get(this, 'timeout'));
    this._setTimer('timer', 'destroyMessage', get(this, 'totalTimeout'));
  },

  _setInitializedTime: function _setInitializedTime() {
    var currentTime = new Date().getTime();

    set(this, 'initializedTime', currentTime);
  },

  _getElapsedTime: function _getElapsedTime() {
    var currentTime = new Date().getTime();
    var initializedTime = get(this, 'initializedTime');

    return currentTime - initializedTime;
  },

  _cancelTimer: function _cancelTimer(name) {
    var timer = get(this, name);

    if (timer) {
      cancel(timer);
      set(this, name, null);
    }
  },

  _cancelAllTimers: function _cancelAllTimers() {
    var _this = this;

    var timers = ['timer', 'exitTimer'];

    timers.forEach(function (timer) {
      _this._cancelTimer(timer);
    });
  }
});