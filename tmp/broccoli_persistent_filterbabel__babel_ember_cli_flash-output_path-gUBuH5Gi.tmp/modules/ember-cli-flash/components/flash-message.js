import Ember from 'ember';
import layout from '../templates/components/flash-message';

var _Ember$String = Ember.String;
var classify = _Ember$String.classify;
var htmlSafe = _Ember$String.htmlSafe;
var Component = Ember.Component;
var getWithDefault = Ember.getWithDefault;
var isPresent = Ember.isPresent;
var run = Ember.run;
var on = Ember.on;
var _get = Ember.get;
var set = Ember.set;
var computed = Ember.computed;
var readOnly = computed.readOnly;
var bool = computed.bool;
var next = run.next;
var cancel = run.cancel;

export default Component.extend({
  layout: layout,
  active: false,
  messageStyle: 'bootstrap',
  classNameBindings: ['alertType', 'active', 'exiting'],

  showProgressBar: readOnly('flash.showProgress'),
  exiting: readOnly('flash.exiting'),
  hasBlock: bool('template').readOnly(),

  alertType: computed('flash.type', {
    get: function get() {
      var flashType = getWithDefault(this, 'flash.type', '');
      var messageStyle = getWithDefault(this, 'messageStyle', '');
      var prefix = 'alert alert-';

      if (messageStyle === 'foundation') {
        prefix = 'alert-box ';
      }

      return '' + prefix + flashType;
    }
  }),

  flashType: computed('flash.type', {
    get: function get() {
      var flashType = getWithDefault(this, 'flash.type', '');

      return classify(flashType);
    }
  }),

  _setActive: on('didInsertElement', function () {
    var _this = this;

    var pendingSet = next(this, function () {
      set(_this, 'active', true);
    });
    set(this, 'pendingSet', pendingSet);
  }),

  progressDuration: computed('flash.showProgress', {
    get: function get() {
      if (!_get(this, 'flash.showProgress')) {
        return false;
      }

      var duration = getWithDefault(this, 'flash.timeout', 0);

      return htmlSafe('transition-duration: ' + duration + 'ms');
    }
  }),

  click: function click() {
    var destroyOnClick = getWithDefault(this, 'flash.destroyOnClick', true);

    if (destroyOnClick) {
      this._destroyFlashMessage();
    }
  },

  mouseEnter: function mouseEnter() {
    var flash = _get(this, 'flash');
    if (isPresent(flash)) {
      flash.deferTimers();
    }
  },

  mouseLeave: function mouseLeave() {
    var flash = _get(this, 'flash');
    if (isPresent(flash)) {
      flash.resumeTimers();
    }
  },

  willDestroy: function willDestroy() {
    this._super();
    this._destroyFlashMessage();
    cancel(_get(this, 'pendingSet'));
  },

  // private
  _destroyFlashMessage: function _destroyFlashMessage() {
    var flash = getWithDefault(this, 'flash', false);

    if (flash) {
      flash.destroyMessage();
    }
  }
});